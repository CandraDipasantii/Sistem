import React, { useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
import locale from "antd/locale/id_ID";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const { RangePicker } = DatePicker;

const Laporan = () => {
  const [dateRange, setDateRange] = useState([
    dayjs("2025-09-01"),
    dayjs("2025-09-08"),
  ]);

  const totalPendapatanData = {
    labels: ["Dapoor M.S", "HomeBro"],
    datasets: [
      {
        data: [45, 55],
        backgroundColor: ["#4A6AFF", "#3B4FFC"],
        borderColor: ["#ffffff"],
        borderWidth: 1.5,
      },
    ],
  };

  const topProductData = [
    {
      merchant: "Dapoor M.S",
      item: "Nasgor Ngejengit",
      qty: 15,
      total: "225.000",
    },
    { merchant: "HomeBro", item: "Cafe Latte", qty: 8, total: "176.000" },
    { merchant: "HomeBro", item: "Cappucino", qty: 7, total: "154.000" },
    {
      merchant: "Dapoor M.S",
      item: "Rice Bowls Spicy Chicken",
      qty: 10,
      total: "150.000",
    },
    {
      merchant: "Dapoor M.S",
      item: "Rice Bowls Cabe Garam",
      qty: 8,
      total: "120.000",
    },
  ];

  const dailySellingData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Daily Sales",
        data: [
          800000, 950000, 500000, 300000, 200000, 100000, 50000, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        fill: false,
        borderColor: "#4A6AFF",
        tension: 0.1,
        pointBackgroundColor: "#4A6AFF",
        pointBorderColor: "#4A6AFF",
      },
    ],
  };

  const profitSummaryData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Profit",
        data: [
          1500000, 2000000, 1800000, 2500000, 2200000, 3000000, 2800000,
          3200000, 1500000, 0, 0, 0,
        ],
        backgroundColor: "#4A6AFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'Rp ' + value.toLocaleString('id-ID');
          }
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'Rp ' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 via-yellow-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">dg</span>
            </div>
            <span className="text-xl font-bold">DAGO</span>
          </div>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center p-3 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
                <span className="mr-3">📊</span>Laporan
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/bagihasil"
                className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
              >
                <span className="mr-3">🤝</span>Bagi Hasil
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 lg:mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">Laporan</h1>
            <p className="text-sm text-gray-600">Dago Creative Hub & Coffee Lab</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm sm:text-base font-medium">OWNER</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
          </div>
        </header>

        {/* Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 rounded-lg shadow-sm bg-white border">
          <div className="flex items-center space-x-2 text-sm sm:text-base mb-4 sm:mb-0">
            <span className="font-medium">Week Period</span>
            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded border">
              <span className="font-semibold text-gray-700">
                📅 {dateRange[0] && dateRange[1]
                  ? `${dateRange[0].format("YYYY-MM-DD")} to ${dateRange[1].format("YYYY-MM-DD")}`
                  : "Pilih tanggal"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <span>Pilih Tanggal</span>
            <ConfigProvider locale={locale}>
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
                format="DD/MM/YYYY"
                className="border-gray-300"
              />
            </ConfigProvider>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Total Pendapatan - Spans 2 columns on large screens */}
          <div className="xl:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Total Pendapatan
                  </h3>
                  <div className="text-2xl font-bold text-gray-900">Rp 150.000.000</div>
                </div>
                <div className="w-48 h-48">
                  <Doughnut data={totalPendapatanData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Daily Selling Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Daily Selling (IDR) September 2025
              </h3>
              <div className="w-full h-64 sm:h-80">
                <Line data={dailySellingData} options={lineChartOptions} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top 10 Product */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Top 10 Product
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-1 text-xs font-medium text-gray-600">
                        Merchant
                      </th>
                      <th className="text-left py-2 px-1 text-xs font-medium text-gray-600">
                        Item
                      </th>
                      <th className="text-center py-2 px-1 text-xs font-medium text-gray-600">
                        Qty
                      </th>
                      <th className="text-right py-2 px-1 text-xs font-medium text-gray-600">
                        Total (Rp)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProductData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-1 text-xs font-medium">{item.merchant}</td>
                        <td className="py-2 px-1 text-xs">{item.item}</td>
                        <td className="py-2 px-1 text-xs text-center font-medium">{item.qty}</td>
                        <td className="py-2 px-1 text-xs text-right font-semibold">Rp {item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profit Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Profit Summary (Last 12 Month IDR)
              </h3>
              <div className="w-full h-56 sm:h-64">
                <Bar data={profitSummaryData} options={barChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;