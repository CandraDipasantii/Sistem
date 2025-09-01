import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const PilihanLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo Dago"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pilih Aksi
        </h2>
        <p className="text-gray-500 mb-6">
          Apa yang ingin Anda lakukan selanjutnya?
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/daftar-member")}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white py-3 rounded-lg font-medium shadow-md transition duration-200"
          >
            Upgrade ke Member
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md transition duration-200"
          >
            Lanjut Booking ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PilihanLogin;
