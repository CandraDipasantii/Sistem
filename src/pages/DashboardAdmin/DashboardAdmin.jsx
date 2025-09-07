import React, { useContext, useEffect, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import RiwayatPesananPage from "../RiwayatPesanan/RiwayatPesanan";
import PengelolaUser from "../PengelolaUser/PengelolaUser";
import PengelolaRuangan from "../PengelolaRuangan/PengelolaRuangan";
import PengelolaPromo from "../PengelolaPromo/PengelolaPromo";
import PengelolaMembership from "../PengelolaMembership/PengelolaMembership";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

// 📌 Komponen Dashboard
const DashboardContent = ({
  orders,
  handleStatusChange,
  getStatusColor,
  formatPrice,
  setShowBilling,
}) => {
  return (
    <div className="p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
      {/* Orders Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 lg:p-6 h-full">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">
            Pesanan Terbaru
          </h3>
          <div className="space-y-3 lg:space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center space-x-3 lg:space-x-4 mb-2 sm:mb-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {order.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm lg:text-base">
                      {order.name}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-500">
                      Pesanan {order.orderId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <button
                    onClick={() => handleStatusChange(order.id)}
                    className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors ${getStatusColor(
                      order.status
                    )} cursor-pointer`}
                  >
                    {order.status}
                  </button>
                  <span className="font-bold text-blue-600 text-sm lg:text-base">
                    {formatPrice(order.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 lg:p-6 text-center">
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - 0.6)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg lg:text-2xl font-bold text-gray-800">
                60%
              </span>
            </div>
          </div>
          <h4 className="font-semibold text-gray-800 text-sm lg:text-base">
            Penjualan Hari Ini
          </h4>
          <p className="text-xs lg:text-sm text-gray-500">Total Sales</p>
        </div>
      </div>
    </div>
  );
};

// 📌 Main Component
const DashboardAdmin = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [showBilling, setShowBilling] = useState(false);
  const navigate = useNavigate();

  const { userProfile } = useContext(AuthContext);
  console.log(userProfile);

  useEffect(() => {
    if (userProfile.roles !== "admin") {
      navigate("/");
    }
  }, [userProfile]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Xes",
      orderId: "#001",
      status: "WAITING",
      price: 57000,
      avatar: "X",
    },
    {
      id: 2,
      name: "Meca",
      orderId: "#002",
      status: "SUCCESS",
      price: 15000,
      avatar: "M",
    },
    {
      id: 3,
      name: "Jonathan",
      orderId: "#003",
      status: "SUCCESS",
      price: 28000,
      avatar: "J",
    },
    {
      id: 4,
      name: "24st7",
      orderId: "#004",
      status: "TAKE AWAY",
      price: 15000,
      avatar: "2",
    },
    {
      id: 5,
      name: "Diah",
      orderId: "#005",
      status: "SUCCESS",
      price: 30000,
      avatar: "D",
    },
  ]);

  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Riwayat Pesanan", icon: "📋" },
    { name: "Pengelola User", icon: "👥" },
    { name: "Pengelola Ruangan", icon: "🏢" },
    { name: "Pengelola Promo", icon: "📢" },
    { name: "Pengelola Membership", icon: "💎" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "WAITING":
        return "bg-yellow-100 text-yellow-800";
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "TAKE AWAY":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (orderId) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const statuses = ["WAITING", "SUCCESS", "TAKE AWAY"];
          const currentIndex = statuses.indexOf(order.status);
          const nextIndex = (currentIndex + 1) % statuses.length;
          return { ...order, status: statuses[nextIndex] };
        }
        return order;
      })
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("IDR", "Rp.");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 bg-white shadow-xl border-r border-gray-200 flex-col">
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-base lg:text-lg">
                CL
              </span>
            </div>
            <span className="text-lg lg:text-xl font-semibold text-gray-800">
              Dago ENG
            </span>
          </div>
        </div>
        <nav className="flex-1 p-2 lg:p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMenu(item.name)}
              className={`w-full flex items-center space-x-3 lg:space-x-4 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 text-left ${
                selectedMenu === item.name
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <span className="text-lg lg:text-xl">{item.icon}</span>
              <span className="font-medium text-sm lg:text-base">
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white m-2 md:m-4 ml-0 rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                Welcome 👋
              </h1>
              <p className="text-gray-500 text-sm lg:text-base">
                Coffee Lab Creative Hub & Coffee Lab
              </p>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-1 lg:space-x-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-xs lg:text-sm">Hari ini</span>
              </div>
              {selectedMenu === "Dashboard" && (
                <button
                  onClick={() => setShowBilling(true)}
                  className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm lg:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span>Pesanan Baru</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedMenu === "Dashboard" && (
            <DashboardContent
              orders={orders}
              handleStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              formatPrice={formatPrice}
              setShowBilling={setShowBilling}
            />
          )}
          {selectedMenu === "Riwayat Pesanan" && (
            <RiwayatPesananPage orders={orders} />
          )}
          {selectedMenu === "Pengelola User" && <PengelolaUser />}
          {selectedMenu === "Pengelola Ruangan" && <PengelolaRuangan />}
          {selectedMenu === "Pengelola Promo" && <PengelolaPromo />}
          {selectedMenu === "Pengelola Membership" && <PengelolaMembership />}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
