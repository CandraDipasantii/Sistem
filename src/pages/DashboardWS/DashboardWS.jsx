import React, { useContext, useEffect, useState } from "react";
import { Images, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../providers/AuthProvider";

const meetingRooms = [
  {
    id: 1,
    name: "Ruangan Meeting 01",
    price: "Rp50.000/jam",
    description:
      "Privasi terjaga, fokus maksimal. Ruang meeting yang ideal untuk tim maksimal 9 orang. Dilengkapi dengan fasilitas lengkap seperti TV, dan akses WIFI unlimited. Cocok untuk rapat tim kecil atau brainstorming.",
    facilities: ["AC", "TV", "WIFI", "Stop Kontak"],
    mainImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Ruangan Meeting 02",
    price: "Rp75.000/jam",
    description:
      "Cocok untuk rapat kecil atau brainstorming dengan tim hingga 4 orang. Nyaman dengan AC dan TV untuk presentasi.",
    facilities: ["AC", "TV"],
    mainImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Ruangan Meeting 03",
    price: "Rp100.000/jam",
    description:
      "Ruang meeting luas dengan kapasitas hingga 8 orang, cocok untuk tim besar. Dilengkapi dengan fasilitas lengkap.",
    facilities: ["AC", "Stop Kontak"],
    mainImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

// Data Space Monitor
const spaceMonitors = [
  {
    id: 4,
    name: "Space Monitor 1",
    price: "Rp10.000/jam",
    description: "Monitor standar 24 inch untuk kebutuhan kerja ringan.",
    features: ["Resolusi Full HD", "HDMI Port", "Layar Anti Glare"],
    mainImage:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Space Monitor 2",
    price: "Rp15.000/jam",
    description:
      "Monitor 27 inch dengan kualitas gambar jernih, cocok untuk desain.",
    features: ["Resolusi 2K", "Wide Color Gamut", "Adjustable Stand"],
    mainImage:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Space Monitor 3",
    price: "Rp20.000/jam",
    description: "Monitor 32 inch untuk pengalaman visual lebih luas.",
    features: ["Resolusi 4K", "HDR Support", "Dual HDMI"],
    mainImage:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Space Monitor 4",
    price: "Rp25.000/jam",
    description:
      "Monitor gaming dengan refresh rate tinggi, cocok juga untuk multitasking.",
    features: ["Resolusi 2K", "165Hz Refresh Rate", "Adaptive Sync"],
    mainImage:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Space Monitor 5",
    price: "Rp30.000/jam",
    description:
      "Monitor ultra-wide untuk produktivitas dan pengalaman sinematik.",
    features: ["UltraWide 34 inch", "WQHD", "Curved Display"],
    mainImage:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
];

// Data Membership
const memberships = [
  {
    id: 1,
    name: "Membership 1",
    price: "Rp200.000/bulan",
    description: "Akses ruang kerja reguler 20 jam/bulan.",
    benefits: ["Diskon 10%", "Free WIFI", "1x Meeting Room"],
    mainImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Membership 2",
    price: "Rp350.000/bulan",
    description: "Akses ruang kerja reguler 50 jam/bulan.",
    benefits: ["Diskon 15%", "Free WIFI", "2x Meeting Room"],
    mainImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Membership 3",
    price: "Rp500.000/bulan",
    description: "Full access ruang kerja & meeting tanpa batas.",
    benefits: ["Diskon 20%", "Free WIFI", "Unlimited Meeting Room"],
    mainImage:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
  },
];

const DashboardWS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (userProfile.roles === "admin") {
      navigate("/dashboardadmin");
    } else if (userProfile.roles === "kasir") {
      navigate("/mengelola-orderan_fb");
    } else {
      return;
    }
  }, [userProfile]);

  const filteredRooms = meetingRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4  min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5">
        {/* Logo */}
        <div className=" py-6 px-4 sm:px-8 flex items-center gap-6">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo Dago"
            className="h-20 w-auto object-contain"
          />

          {/* Text */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Welcome to dago
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Coworking Space in North, Creative Hub & F&amp;B untuk Skena Anak
              Muda di Singaraja
            </p>
          </div>
        </div>

        {/* Button */}
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-full border-0 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Membership Section */}
      {/* Membership Section */}
      <div className="flex items-center justify-between px-1 mb-4">
        <h2 className="text-lg font-bold text-gray-800">Paket Membership</h2>
        <div className="flex gap-3">
          {isLoggedIn ? (
            ""
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md transition duration-200"
            >
              Login
            </button>
          )}
          <button
            onClick={() => navigate("/daftar-member")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md transition duration-200"
          >
            Daftar Member
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {memberships.map((member, index) => (
          <div
            key={member.id}
            className="relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-[2px] shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-white rounded-2xl flex flex-col overflow-hidden">
              {/* Image */}
              <div className="w-full h-40 bg-gray-200 relative">
                <img
                  src={member.mainImage}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
                {index === 1 && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-white font-bold px-3 py-1 rounded-full shadow-md">
                    Best Seller
                  </span>
                )}
              </div>
              {/* Details */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {member.price}
                </p>
                <p className="text-gray-600 text-sm flex-1 leading-relaxed mb-3">
                  {member.description}
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-3">
                  {member.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Button */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => navigate("/daftar-member")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md"
                >
                  Pilih Membership
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Space Monitor Section */}
      <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">
        Space Monitor
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {spaceMonitors.map((monitor) => (
          <div
            key={monitor.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
          >
            {/* Monitor Image */}
            <div className="w-full h-40 bg-gray-200">
              <img
                src={monitor.mainImage}
                alt={monitor.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Monitor Details */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {monitor.name}
              </h2>
              <p className="text-blue-600 font-semibold mb-2">
                {monitor.price}
              </p>
              <p className="text-gray-600 text-sm mb-3 flex-1 leading-relaxed">
                {monitor.description}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                {monitor.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() =>
                  navigate(`/monitor/${monitor.id}`, { state: monitor })
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
              >
                Pilih Monitor
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Meeting Rooms List - Sama kaya Space Monitor */}
      <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">
        Meeting Room
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
          >
            {/* Room Image */}
            <div className="w-full h-40 bg-gray-200">
              <img
                src={room.mainImage}
                alt={room.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Room Details */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {room.name}
              </h2>
              <p className="text-blue-600 font-semibold mb-2">{room.price}</p>
              <p className="text-gray-600 text-sm mb-3 flex-1 leading-relaxed">
                {room.description}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                {room.facilities.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() =>
                  navigate(`/roomdetail/${room.id}`, { state: room })
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
              >
                Pilih Ruangan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWS;
