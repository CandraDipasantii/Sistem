import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import DashboardWS from "./pages/DashboardWS/DashboardWS";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import BookingRuangan from "./pages/BookingRuangan/BookingRuangan";
import BookingPayment from "./pages/BookingPayment/BookingPayment";
import BookingSukses from "./pages/BookingSukses/BookingSukses";
import DetailBooking from "./pages/DetailBooking/DetailBooking";
import DaftarMember from "./pages/DaftarMember/DaftarMember";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DaftarAkun from "./pages/DaftarAkun/DaftarAkun";
import Login from "./pages/Login/Login";
import PilihanLogin from "./pages/PilihanLogin/PilihanLogin";
import RiwayatPesanan from "./pages/RiwayatPesanan/RiwayatPesanan";
import PengelolaUser from "./pages/PengelolaUser/PengelolaUser";
import PengelolaRuangan from "./pages/PengelolaRuangan/PengelolaRuangan";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/layout/PrivateRoute";
import MengelolaOrderF_B from "./pages/Kasir/MengelolaOrderF&B/MengelolaOrderF&B";
import MainKasir from "./components/layout/MainKasir";
import MengelolaBookingRuangan from "./pages/Kasir/MengelolaBookingRuangan/MengelolaBookingRuangan";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<DashboardWS />} />

        {/* <Route path='/dashboardws' element={<DashboardWS/>}/> */}

        <Route path="/roomdetail/:id" element={<RoomDetail />} />

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
          path="/detail-booking"
          element={
            <PrivateRoute>
              <DetailBooking />
            </PrivateRoute>
          }
        />

        <Route path="/daftar-member" element={<DaftarMember />} />

        <Route path="/login" element={<Login />} />

        <Route path="/daftar-akun" element={<DaftarAkun />} />

        <Route path="/pilihan-login" element={<PilihanLogin />} />

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
      </Routes>
    </AuthProvider>
  );
};

export default App;
