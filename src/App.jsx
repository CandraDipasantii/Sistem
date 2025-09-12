import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import DashboardWS from "./pages/DashboardWS/DashboardWS/DashboardWS";
import RoomDetail from "./pages/Pelanggan/RoomDetail/RoomDetail";
import BookingRuangan from "./pages/Pelanggan/BookingRuangan/BookingRuangan";
import BookingPayment from "./pages/Pelanggan/BookingPayment/BookingPayment";
import BookingSukses from "./pages/Pelanggan/BookingSukses/BookingSukses";
import DaftarMember from "./pages/Pelanggan/DaftarMember/DaftarMember";
import DashboardAdmin from "./pages/Admin/DashboardAdmin/DashboardAdmin";
import DaftarAkun from "./pages/Pelanggan/DaftarAkun/DaftarAkun";
import Login from "./pages/Login/Login";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/layout/PrivateRoute";
import MengelolaOrderF_B from "./pages/Kasir/MengelolaOrderF&B/MengelolaOrderF&B";
import MainKasir from "./components/layout/MainKasir";
import MengelolaBookingRuangan from "./pages/Kasir/MengelolaBookingRuangan/MengelolaBookingRuangan";
import DaftarVO from "./pages/Pelanggan/DaftarVO/DaftarVO";
import RiwayatTransaksi from "./pages/Pelanggan/RiwayatTransaksi/RiwayatTransaksi";
import CekKreditMembership from "./pages/Pelanggan/CekKreditMembership/CekKreditMembership";
import CekMasaVO from "./pages/Pelanggan/CekMasaVo/CekMasaVo";
import DashboardPengguna from "./pages/Pelanggan/DashboardPengguna/DashboardPengguna";
import InformasiRuangan from "./pages/Pelanggan/InformasiRuangan/InformasiRuangan";
import VirtualOffice from "./pages/Pelanggan/VirtualOffice/VirtualOffice";
import DetailPaket from "./pages/Pelanggan/DetailPaket/DetailPaket";
import InformasiWS from "./pages/DashboardWS/InformasiWS/InformasiWS";
import InformasiVO from "./pages/DashboardWS/InformasiVO/InformasiVO";
import Membership from "./pages/Pelanggan/Membership/Membership";
import SpaceRental from "./pages/Admin/SpaceRental/SpaceRental";
import { TranslationOutlined } from "@ant-design/icons";
import MasterData from "./pages/Admin/MasterData/MasterData";


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<DashboardWS />} />

        {/* <Route path='/dashboardws' element={<DashboardWS/>}/> */}

        <Route path="/roomdetail/:id" element={<RoomDetail />} />

        <Route
          path="/dashboard-pengguna"
          element={
            <PrivateRoute>
              <DashboardPengguna />
            </PrivateRoute>
          }
        />

        <Route
          path="/booking/:id"
          element={
            <PrivateRoute>
              {" "}
              <BookingRuangan />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/payment/:id"
          element={
            <PrivateRoute>
              {" "}
              <BookingPayment />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/booking-sukses"
          element={
            <PrivateRoute>
              {" "}
              <BookingSukses />
            </PrivateRoute>
          }
        />

        <Route
          path="/informasi-ruangan"
          element={
            <PrivateRoute>
              {" "}
              <InformasiRuangan />
            </PrivateRoute>
          }
        />

        <Route
          path="/virtual-office"
          element={
            <PrivateRoute>
              <VirtualOffice />
            </PrivateRoute>
          }
        />

        <Route
          path="/detail-paket"
          element={
            <PrivateRoute>
              <DetailPaket />
            </PrivateRoute>
          }
        />

        <Route
          path="/detail-paket/:id"
          element={
            <PrivateRoute>
              <DetailPaket />
            </PrivateRoute>
          }
        />

        <Route
          path="/riwayat-transaksi"
          element={
            <PrivateRoute>
              <RiwayatTransaksi />
            </PrivateRoute>
          }
        />

        <Route
          path="/cek-kredit-membership"
          element={
            <PrivateRoute>
              <CekKreditMembership />
            </PrivateRoute>
          }
        />

        <Route
          path="/cek-masa-VO"
          element={
            <PrivateRoute>
              <CekMasaVO />
            </PrivateRoute>
          }
        />

        <Route
          path="/membership"
          element={
            <PrivateRoute>
              <Membership />
            </PrivateRoute>
          }
        />

        <Route path="/daftar-member" element={<DaftarMember />} />

        <Route path="/daftar-vo" element={<DaftarVO />} />

        <Route path="/login" element={<Login />} />

        <Route path="/daftar-akun" element={<DaftarAkun />} />

        <Route path="/informasiws" element={<InformasiWS />} />

        <Route path="/informasivo" element={<InformasiVO />} />

        {/* ADMIN */}
        <Route
          path="/dashboardadmin"
          element={
            <PrivateRoute>
              {" "}
              <DashboardAdmin />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/riwayatpesanan"
          element={
            <PrivateRoute>
              {" "}
              <RiwayatPesanan />
            </PrivateRoute>
          }
        />

        <Route
          path="/pengelolauser"
          element={
            <PrivateRoute>
              {" "}
              <PengelolaUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/pengelolaruangan"
          element={
            <PrivateRoute>
              {" "}
              <PengelolaRuangan />
            </PrivateRoute>
          }
        />

        <Route
          path="/mengelola-orderan_fb"
          element={
            <PrivateRoute>
              <MainKasir>
                <MengelolaOrderF_B />
              </MainKasir>
            </PrivateRoute>
          }
        />

        <Route
          path="/mengelola-booking-ruangan"
          element={
            <PrivateRoute>
              <MainKasir>
                <MengelolaBookingRuangan />
              </MainKasir>
            </PrivateRoute>
          }
        />
        <Route
          path="/space-rental"
          element={
            <PrivateRoute>
              {" "}
              <SpaceRental />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaksi-admin"
          element={
            <PrivateRoute>
              {" "}
              <TranslationOutlined />
            </PrivateRoute>
          }
        />
        <Route
          path="/master-data"
          element={
            <PrivateRoute>
              {" "}
              <MasterData />
            </PrivateRoute>
          }
        />
      </Routes>


    </AuthProvider>
  );
};

export default App;
