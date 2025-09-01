import React from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import DashboardWS from './pages/DashboardWS/DashboardWS'
import RoomDetail from './pages/RoomDetail/RoomDetail'
import BookingRuangan from './pages/BookingRuangan/BookingRuangan'
import BookingPayment from './pages/BookingPayment/BookingPayment'
import BookingSukses from './pages/BookingSukses/BookingSukses'
import DetailBooking from './pages/DetailBooking/DetailBooking'
import DaftarMember from './pages/DaftarMember/DaftarMember'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'
import DaftarAkun from './pages/DaftarAkun/DaftarAkun'
import Login from './pages/Login/Login'
import PilihanLogin from './pages/PilihanLogin/PilihanLogin'
import RiwayatPesanan from './pages/RiwayatPesanan/RiwayatPesanan'
import PengelolaUser from './pages/PengelolaUser/PengelolaUser'
import PengelolaRuangan from './pages/PengelolaRuangan/PengelolaRuangan'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardWS/>}/>

      {/* <Route path='/dashboardws' element={<DashboardWS/>}/> */}

      <Route path="/roomdetail/:id" element={<RoomDetail />} />

      <Route path="/booking/:id" element={<BookingRuangan />} />

      <Route path="/payment/:id" element={<BookingPayment />} />

      <Route path='/booking-sukses' element={<BookingSukses/>} />

      <Route path='/detail-booking' element={<DetailBooking/>} />

      <Route path='/daftar-member' element={<DaftarMember/>} />

      <Route path='/login' element={<Login/>}/>

      <Route path='/daftar-akun' element={<DaftarAkun/>}/>

      <Route path='/pilihan-login' element={<PilihanLogin/>}/>

      {/* ADMIN */}
      <Route path='/dashboardadmin' element={<DashboardAdmin/>}/> 

      <Route path='/riwayatpesanan' element={<RiwayatPesanan/>}/> 

      <Route path='/pengelolauser' element={<PengelolaUser/>}/> 

      <Route path='/pengelolaruangan' element={<PengelolaRuangan/>}/> 


      


    </Routes>
  )
}

export default App