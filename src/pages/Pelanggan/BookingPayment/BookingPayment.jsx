import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import moment from "moment";

const BookingPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    room,
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    duration,
    name,
    purpose,
  } = location.state || {};

  useEffect(() => {
    if (!location.state) navigate("/"); // redirect jika tidak ada data
  }, [location.state, navigate]);

  if (!location.state) return null;

  const calculateTotalPrice = () => {
    const serviceFee = 25000;
    return room.price * duration + serviceFee;
  };

  const formattedDate = moment(selectedDate).format("DD MMMM YYYY");
  const formattedStartTime = selectedStartTime || "-";
  const formattedEndTime = selectedEndTime || "-";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-lg w-full">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan QR Code</h2>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Gunakan aplikasi e-wallet untuk <br /> scan dan bayar dengan QRIS
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="w-56 h-56 bg-white p-4 rounded-xl shadow-lg border flex items-center justify-center">
              <span className="text-gray-500 text-sm">QR Code Placeholder</span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h3 className="font-bold text-lg mb-2 text-center">Detail Pemesanan</h3>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Ruangan</span>
            <span className="font-semibold">{room.name}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Tanggal</span>
            <span className="font-semibold">{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Waktu</span>
            <span className="font-semibold">
              {formattedStartTime} - {formattedEndTime}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Durasi</span>
            <span className="font-semibold">{duration} jam</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Nama</span>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Keperluan</span>
            <span className="font-semibold">{purpose || "-"}</span>
          </div>

          <hr className="my-2 border-gray-200" />
          <div className="flex justify-between font-semibold text-xl text-gray-900">
            <span>Total Bayar</span>
            <span>Rp{calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold shadow-md transition"
          >
            Batal
          </button>
          <Link
            to="/booking-sukses"
            state={{
              name,
              roomName: room.name,
              totalPrice: calculateTotalPrice(),
              date: formattedDate,
              startTime: formattedStartTime,
              endTime: formattedEndTime,
            }}
          >
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md transition">
              Cek Status
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
