import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BookingSukses = () => {
  const id = "12345"; // contoh id pesanan, bisa diambil dari props atau URL param

  const handleUnduhBukti = () => {
    console.log("Mengunduh bukti pembayaran...");
    // implementasi download bukti, misalnya generate PDF
  };

  const handleKembaliKeHome = () => {
    console.log("Kembali ke beranda...");
    // navigate("/") kalau mau langsung balik home
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2} />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Pesanan #{id} Berhasil!
          </h1>

          <p className="text-gray-600 text-base mb-8 leading-relaxed">
            Silakan melakukan pembayaran <br /> melalui kasir.
          </p>

          {/* Download Button */}
          <Link to={"/detail-booking"}>       
          <button
            onClick={handleUnduhBukti}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-md transition duration-200 transform hover:scale-105"
          >
            Unduh Bukti Pemesanan
          </button>
          </Link>

          {/* Back to Home Button */}
          <Link to={"/"}>
          
          <button
            onClick={handleKembaliKeHome}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-full font-medium text-base transition duration-200"
          >
            Kembali ke Beranda
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSukses;
