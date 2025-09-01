import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BookingPaymentPage = () => {
  const { id } = useParams(); // dapetin id payment dari URL
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div>
        {/* Header */}
        <div className="px-8 py-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Scan QR Code #{id}
          </h2>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Gunakan aplikasi e-wallet untuk
            <br />
            scan dan bayar dengan QRIS
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="w-56 h-56 bg-white p-4 rounded-xl shadow-lg border">
              <div className="w-full h-full bg-black relative overflow-hidden rounded-lg">
                {/* Corner squares */}
                <div className="absolute top-2 left-2 w-6 h-6 border-4 border-white">
                  <div className="w-2 h-2 bg-white m-1"></div>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 border-4 border-white">
                  <div className="w-2 h-2 bg-white m-1"></div>
                </div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-white">
                  <div className="w-2 h-2 bg-white m-1"></div>
                </div>

                {/* Random pattern simulation */}
                <div className="absolute inset-4 grid grid-cols-12 gap-0.5">
                  {Array.from({ length: 144 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${
                        Math.random() > 0.5 ? "bg-white" : "bg-black"
                      }`}
                    />
                  ))}
                </div>

                {/* Alignment pattern */}
                <div className="absolute bottom-6 right-6 w-4 h-4 border-2 border-white">
                  <div className="w-1 h-1 bg-white m-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold shadow-md transition duration-200"
            >
              Batal
            </button>

            <Link to={"/booking-sukses"}>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md transition duration-200">
                Cek Status
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentPage;
