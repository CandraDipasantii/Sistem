import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaClipboard,
} from "react-icons/fa";

const BookingRuangan = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");

  const [openDetail, setOpenDetail] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);
  const handleStartTimeChange = (e) => {
    const value = e.target.value; // format "HH:MM"
    const [h, m] = value.split(":").map(Number);

    const now = new Date();
    const selected = new Date(selectedDate);
    selected.setHours(h, m, 0, 0);

    // Jika tanggal hari ini dan waktu input lebih kecil dari sekarang, tolak
    if (selectedDate.toDateString() === now.toDateString() && selected < now) {
      setStartTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`
      );
    } else {
      setStartTime(value);
    }
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value; // format "HH:MM"
    const [h, m] = value.split(":").map(Number);

    const selected = new Date(selectedDate);
    selected.setHours(h, m, 0, 0);

    const [startH, startM] = startTime.split(":").map(Number);
    const start = new Date(selectedDate);
    start.setHours(startH, startM, 0, 0);

    if (selected < start) {
      // Jika endTime < startTime, otomatis set endTime = startTime
      setEndTime(startTime);
    } else {
      setEndTime(value);
    }
  };

  // Hitung endTime otomatis dari startTime + duration
  useEffect(() => {
    if (startTime && duration) {
      const [h, m] = startTime.split(":").map(Number);
      const totalMinutes = h * 60 + m + parseInt(duration) * 60;
      const endH = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
      const endM = String(totalMinutes % 60).padStart(2, "0");
      setEndTime(`${endH}:${endM}`);
    }
  }, [startTime, duration]);

  // Hitung duration otomatis dari startTime & endTime
  useEffect(() => {
    if (startTime && endTime) {
      const [h1, m1] = startTime.split(":").map(Number);
      const [h2, m2] = endTime.split(":").map(Number);
      const minutes1 = h1 * 60 + m1;
      const minutes2 = h2 * 60 + m2;
      if (minutes2 > minutes1) {
        setDuration((minutes2 - minutes1) / 60);
      }
    }
  }, [endTime]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl rounded-2xl shadow-lg p-4 sm:p-6 space-y-5">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-3 pb-3">
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Booking Ruangan
            </h2>
          </div>
          <hr className="border-gray-300" />
        </div>

        {/* Layout utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Calendar */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FaCalendarAlt className="text-blue-500" />
              <p className="text-gray-600 font-medium">Pilih Tanggal</p>
            </div>
            <div className="flex justify-center">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                prev2Label={null} // Menghapus tombol prev tahun
                next2Label={null} // Menghapus tombol next tahun
                className="rounded-xl border border-gray-300 p-2"
              />
            </div>
          </div>

          {/* Time & Duration */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FaClock className="text-blue-500" />
              <p className="text-gray-600 font-medium">Pilih Jam</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm">Jam Mulai</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 focus:ring-2 focus:ring-blue-500 appearance-none text-center"
                />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Jam Selesai</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 focus:ring-2 focus:ring-blue-500 appearance-none text-center"
                />
              </div>
            </div>

            {/* Durasi */}
            <div className="mt-4 text-center">
              <label className="block text-gray-600 text-sm mb-1">
                Durasi (jam)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full sm:w-1/2 mx-auto rounded-xl border border-gray-300 bg-gray-100 p-3 focus:ring-2 focus:ring-blue-500 text-center"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-2 text-gray-600 font-medium">
              <FaUser className="text-blue-500" />
              <span>Nama</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="flex items-center space-x-2 text-gray-600 font-medium">
              <FaPhone className="text-blue-500" />
              <span>No. HP</span>
            </label>
            <input
              type="tel"
              placeholder="No. HP"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setPhone(value);
              }}
              className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-600 font-medium">
            <FaClipboard className="text-blue-500" />
            <span>Keperluan</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan keperluan (opsional)"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => setOpenDetail(true)}
          disabled={
            !name ||
            !phone ||
            !startTime ||
            !endTime ||
            !duration ||
            !/^[0-9]*$/.test(phone)
          }
          className={`w-full font-semibold py-3 rounded-xl shadow transition 
            ${
              !name ||
              !phone ||
              !startTime ||
              !endTime ||
              !duration ||
              !/^[0-9]*$/.test(phone)
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Place Booking
        </button>
      </div>

      {/* Detail Booking Pop-up */}
      {openDetail && (
        <div
          className="fixed inset-0  bg-opacity-30 z-50 flex justify-center items-end"
          onClick={() => setOpenDetail(false)} // klik di overlay menutup pop-up
        >
          <div
            className="bg-white rounded-t-2xl shadow-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()} // klik di dalam pop-up tidak menutup
          >
            <h2 className="text-center text-lg font-bold tracking-wide mb-6">
              Detail Booking
            </h2>

            <div className="border rounded-xl p-4 mb-6 bg-gray-50 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Tanggal</span>
                <span>
                  {selectedDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Waktu</span>
                <span>
                  {startTime} - {endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Nama</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">No Hp</span>
                <span>{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Keperluan</span>
                <span>{purpose || "-"}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setOpenDetail(false);
                setOpenBilling(true);
              }}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Place Booking
            </button>
          </div>
        </div>
      )}

      {/* Billing Pop-up */}
      {openBilling && (
        <div
          className="fixed inset-0 bg-opacity-30 z-50 flex justify-center items-end"
          onClick={() => setOpenBilling(false)} // klik di overlay menutup pop-up
        >
          <div
            className="bg-white rounded-t-2xl shadow-lg p-4 sm:p-6 max-h-[80vh] overflow-y-auto w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()} // klik di dalam pop-up tidak menutup
          >
            <h2 className="text-center text-lg font-bold tracking-wide mb-6">
              BILLING
            </h2>

            <div className="border rounded-xl p-4 mb-6 bg-gray-50">
              <div className="flex justify-between text-sm mb-2">
                <span>{duration} jam x Rp50.000</span>
                <span>Rp{duration * 50000}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Biaya Layanan</span>
                <span>Rp25.000</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>Rp{duration * 50000 + 25000}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Metode Pembayaran
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="qris"
                  name="payment"
                  className="accent-blue-600"
                />
                <label htmlFor="qris">Qris</label>
              </div>
            </div>

            {/* Button Place Booking */}
            <button
              onClick={() =>
                navigate(`/payment/${room.id}`, {
                  state: {
                    room,
                    selectedDate,
                    startTime,
                    endTime,
                    duration,
                    name,
                    phone,
                    purpose,
                  },
                })
              }
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Place Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingRuangan;
