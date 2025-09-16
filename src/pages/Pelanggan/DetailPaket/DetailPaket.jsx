import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Spin, message } from "antd";
import { getDetailPaketVO } from "../../../services/service"; // service API

const DetailPaket = () => {
  const { id } = useParams(); // ambil id paket dari URL
  const navigate = useNavigate();
  const location = useLocation();

  const paketName = location.state?.paketName || "Detail Paket";

  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch detail paket VO
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await getDetailPaketVO(id);
        setPaket(result);
      } catch (error) {
        message.error("Gagal memuat detail paket Virtual Office");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;
  }

  if (!paket) {
    return (
      <p className="text-center text-red-500 mt-20">
        Paket tidak ditemukan
      </p>
    );
  }

  // Susun data benefit berdasarkan field dari database
  const data = {
    benefits: [
      { name: "Harga", value: `Rp${paket.harga.toLocaleString("id-ID")}` },
      { name: "Durasi Paket", value: `${paket.durasi} hari` },
      { name: "Free meeting room*", value: `${paket.benefit_jam_meeting_room_per_bulan} jam/bulan` },
      { name: "Free working space", value: `${paket.benefit_jam_working_space_per_bulan} jam/bulan` },
      { name: "Free wifi member", value: "✔️" },
      { name: "Alamat bisnis untuk legalitas usaha", value: "✔️" },
      { name: "Penerimaan surat & paket", value: "✔️" },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F2ED] flex justify-center px-4 lg:px-8 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={() =>
            navigate("/dashboard-pengguna", { state: { activeMenu: "virtual-office" } })
          }
          className="mb-6 text-blue-600 font-medium hover:underline"
        >
          ← Kembali
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          {paket.nama_paket}
        </h1>

        {/* Tabel detail paket */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-3">Benefit</th>
                <th className="border border-gray-300 p-3 text-center">{paket.nama_paket}</th>
              </tr>
            </thead>
            <tbody>
              {data.benefits.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{row.name}</td>
                  <td className="border border-gray-300 p-3 text-center">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol Pilih Paket */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate(`/daftar-vo`, { state: { paketId: paket.id_paket_vo } })}
            className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Pilih {paket.nama_paket}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPaket;
