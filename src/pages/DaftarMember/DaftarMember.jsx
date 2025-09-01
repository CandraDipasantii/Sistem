import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DaftarMember = () => {
  const [registered, setRegistered] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    noTelepon: "",
    password: "",
    confirmPassword: "",
    pilihMembership: "",
    syaratKetentuan: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setOpenPopup(true);
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white p-8 text-center border-b border-gray-100">
          <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-2">
            {!registered ? "Daftar Membership" : "Kartu Member"}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {!registered
              ? "Isi formulir berikut untuk bergabung"
              : "Selamat! Berikut detail membership Anda"}
          </p>
        </div>

        {/* Konten */}
        <div className="p-8 space-y-6">
          {!registered ? (
            <>
              {/* FORM DAFTAR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  placeholder="Nama Lengkap"
                  className="px-4 py-3 border border-gray-200 rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="px-4 py-3 border border-gray-200 rounded-lg"
                />
                <input
                  type="tel"
                  name="noTelepon"
                  value={formData.noTelepon}
                  onChange={handleInputChange}
                  placeholder="No. Telepon"
                  className="px-4 py-3 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="px-4 py-3 border border-gray-200 rounded-lg"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Konfirmasi Password"
                  className="px-4 py-3 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="relative">
                <select
                  name="pilihMembership"
                  value={formData.pilihMembership}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none"
                >
                  <option value="">Pilih paket membership</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="syaratKetentuan"
                  checked={formData.syaratKetentuan}
                  onChange={handleInputChange}
                  className="accent-blue-600 mr-2"
                />
                Saya setuju dengan syarat & ketentuan
              </label>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
              >
                DAFTAR MEMBERSHIP
              </button>
            </>
          ) : (
            // KARTU MEMBER
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Kartu Member</h2>
                <div className="space-y-2">
                  <p><strong>Nama:</strong> {formData.namaLengkap}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Telepon:</strong> {formData.noTelepon}</p>
                  <p>
                    <strong>Paket:</strong>{" "}
                    {formData.pilihMembership.charAt(0).toUpperCase() +
                      formData.pilihMembership.slice(1)}
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
  <button
    onClick={() => alert("Download kartu membership")}
    className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
  >
    Unduh
  </button>
</div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pop-up */}
      {openPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          onClick={() => setOpenPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">Selamat!</h2>
            <p className="mb-4">Anda telah terdaftar sebagai member.</p>
            <button
              onClick={() => setOpenPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarMember;
