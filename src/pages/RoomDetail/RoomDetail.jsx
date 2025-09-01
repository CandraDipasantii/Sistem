import React, { useState } from "react";
import { FaTv, FaSnowflake, FaWifi, FaPlug } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const RoomDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // ambil data dari state (navigate) atau langsung dari localStorage meetingRooms (fallback FE aja)
  const room =
    location.state ||
    JSON.parse(localStorage.getItem("meetingRooms") || "[]").find(
      (r) => r.id === Number(id)
    );

  const [mainImage, setMainImage] = useState(room?.mainImage || "");

  if (!room) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600">Ruangan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F2ED] flex justify-center px-4 lg:px-8">
      <div className="w-full max-w-5xl bg-[#F5F2ED] text-[#1E1E1E] pb-10">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 border-b border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="text-xl hover:text-blue-500 transition"
          >
            ←
          </button>
          <h1 className="text-lg md:text-xl font-semibold">{room.name}</h1>
        </div>

        {/* Harga */}
        <p className="text-xl md:text-2xl font-bold my-4 text-center">
          {room.price}
        </p>

        {/* Gambar utama + thumbnail */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Gambar utama */}
          <div className="w-full lg:w-3/4 h-52 sm:h-64 md:h-80 lg:h-[28rem] rounded-xl overflow-hidden">
            <img
              src={mainImage}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail */}
          {/* Thumbnail */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:w-1/4">
            {[room.mainImage, ...(room.images || [])].map((src, i) => (
              <div
                key={i}
                onClick={() => setMainImage(src)}
                className="w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 lg:w-full lg:h-28 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80"
              >
                <img
                  src={src}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-sm md:text-base leading-relaxed text-center">
            {room.description}
          </p>
        </div>

        {/* Fasilitas */}
        <div className="mb-12">
          <h2 className="font-semibold mb-5 text-lg md:text-xl">Fasilitas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {room.facilities.includes("TV") && (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <FaTv className="text-3xl mb-2 text-gray-700" />
                <p className="text-sm md:text-base text-center">TV</p>
              </div>
            )}
            {room.facilities.includes("AC") && (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <FaSnowflake className="text-3xl mb-2 text-gray-700" />
                <p className="text-sm md:text-base text-center">AC</p>
              </div>
            )}
            {room.facilities.includes("WIFI") && (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <FaWifi className="text-3xl mb-2 text-gray-700" />
                <p className="text-sm md:text-base text-center">WIFI</p>
              </div>
            )}
            {room.facilities.includes("Stop Kontak") && (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <FaPlug className="text-3xl mb-2 text-gray-700" />
                <p className="text-sm md:text-base text-center">Stop Kontak</p>
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              navigate(`/booking/${room.id}`, {
                state: { room }, // kirim data room ke BookingRuangan
              })
            }
            className="w-full md:w-1/2 bg-blue-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Booking Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
