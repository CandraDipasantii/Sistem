import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- contoh login sederhana ---
    if (email === "admin@dago.com" && password === "123456") {
      alert("Login berhasil!");
      navigate("/pilihan-login"); // setelah login, ke halaman pilihan
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo Dago"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Login
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Masuk untuk mengakses akun Anda
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Link ke daftar akun */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/daftar-akun")}
            className="text-blue-500 hover:underline font-medium"
          >
            Daftar Akun
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
