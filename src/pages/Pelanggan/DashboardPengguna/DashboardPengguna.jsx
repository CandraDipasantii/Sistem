import React, { useState, useContext } from "react";
import { LogOut, Menu, Calendar, CreditCard, Building, Users, Diamond, History } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";

// Import komponen menu
import CekKreditMembership from "../CekKreditMembership/CekKreditMembership";
import CekMasaVO from "../CekMasaVo/CekMasaVo";
import InformasiRuangan from "../InformasiRuangan/InformasiRuangan";
import RiwayatTransaksi from "../RiwayatTransaksi/RiwayatTransaksi";
import VirtualOffice from "../VirtualOffice/VirtualOffice";
import Membership from "../Membership/Membership";

const DashboardPengguna = ({children}) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu || "informasi-ruangan"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { key: "informasi-ruangan", label: "Pesan Ruangan", icon: <Diamond size={20} />, path:"/infromasi-ruangan" },
    { key: "membership", label: "Membership", icon: <Users size={20} /> },
    { key: "virtual-office", label: "Virtual Office", icon: <Building size={20} /> },
    { key: "cek-kredit-membership", label: "Cek Kredit Membership", icon: <CreditCard size={20} /> },
    { key: "cek-masa-vo", label: "Cek Masa VO", icon: <Calendar size={20} /> },
    { key: "riwayat-transaksi", label: "Riwayat Transaksi", icon: <History size={20} /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "informasi-ruangan":
        return <InformasiRuangan />;
      case "membership":
        return <Membership />;
      case "virtual-office":
        return <VirtualOffice />;
      case "cek-kredit-membership":
        return <CekKreditMembership />;
      case "cek-masa-vo":
        return <CekMasaVO />;
      case "riwayat-transaksi":
        return <RiwayatTransaksi />;
      default:
        return <InformasiRuangan />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay sidebar untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Logo */}
        <div className="p-4 lg:p-10 border-b border-gray-100 flex items-center space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-base lg:text-lg">DS</span>
          </div>
          <span className="text-lg lg:text-xl font-semibold text-gray-800 hidden md:inline">
            Dago Space
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 lg:p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 lg:space-x-4 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 text-left
                ${
                  activeMenu === item.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
            >
              <span className="text-lg lg:text-xl">{item.icon}</span>
              <span className="font-medium text-sm lg:text-base">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 lg:p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 lg:space-x-4 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 text-left text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-8 border-b border-gray-100 flex items-center justify-between gap-4 bg-white">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Logo & Greeting */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo Dago" className="h-12 w-auto object-contain" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                Hai, {userProfile?.name || "Diah"} 👋
              </h1>
              <p className="text-gray-500 text-sm lg:text-base">
                Selamat datang kembali di Dago Space!
              </p>
            </div>
          </div>
        </div>

        {/* Konten utama */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPengguna;
