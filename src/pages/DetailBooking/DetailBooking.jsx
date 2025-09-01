import React, { useState } from 'react';

const DetailBooking = () => {
  const [showBilling, setShowBilling] = useState(false);

  const bookingData = {
    id: "22567098",
    ruangan: "Ruang Meeting 01",
    tanggal: "27 Agustus 2025",
    waktu: "09:00 - 10:00",
    durasi: "1 Jam",
    kapasitas: "8 Orang",
    pemesan: "Arman",
    noHP: "+971 58 9871221",
    hargaPerJam: "Rp50.000",
    biayaLayanan: "Rp25.000",
    totalPembayaran: "Rp 75.000"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Status Bar */}
        {/* <div className="flex justify-between items-center px-6 pt-3 pb-1">
          <span className="text-black font-semibold text-base">9:41</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" className="ml-1">
              <path d="M0 3h14v4H0V3zM15 1v8h2V1h-2z" fill="black"/>
            </svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="ml-1">
              <rect x="1" y="2" width="20" height="8" rx="2" stroke="black" strokeWidth="1" fill="none"/>
              <rect x="21" y="4" width="2" height="4" rx="1" fill="black"/>
              <rect x="2" y="3" width="18" height="6" rx="1" fill="black"/>
            </svg>
          </div>
        </div> */}

        {/* Content */}
        <div className="px-6 pb-6">
          
          {/* ID Booking Card */}
          <div className="mt-6 mb-8">
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl p-4 text-center">
              <div className="text-gray-600 text-sm font-medium mb-1">ID BOOKING</div>
              <div className="text-black text-2xl font-bold">{bookingData.id}</div>
            </div>
          </div>

          {/* Detail Booking Title */}
          <h2 className="text-black text-xl font-bold text-center mb-6">DETAIL BOOKING</h2>

          {/* Booking Details */}
          <div className="space-y-4">
            <DetailRow label="Ruangan:" value={bookingData.ruangan} />
            <DetailRow label="Tanggal:" value={bookingData.tanggal} />
            <DetailRow label="Waktu:" value={bookingData.waktu} />
            <DetailRow label="Durasi:" value={bookingData.durasi} />
            <DetailRow label="Kapasitas:" value={bookingData.kapasitas} />
            <DetailRow label="Pemesan:" value={bookingData.pemesan} />
            <DetailRow label="No.HP:" value={bookingData.noHP} />
            <DetailRow label="Harga per jam:" value={bookingData.hargaPerJam} />
            <DetailRow label="Biaya layanan:" value={bookingData.biayaLayanan} />
          </div>

          {/* Total Payment Button */}
          <button 
            // onClick={() => setShowBilling(true)}
            className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors duration-200"
          >
            Total Pembayaran: {bookingData.totalPembayaran}
          </button>
        </div>

        {/* Billing Pop-up */}
        {showBilling && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            <div className="bg-white w-full max-w-sm rounded-t-3xl p-6 animate-slide-up">
              
              {/* Handle Bar */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
              
              {/* Billing Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-6">Detail Pembayaran</h3>
                
                <div className="space-y-4 text-left">
                  <BillingRow label="Harga per jam:" value={bookingData.hargaPerJam} />
                  <BillingRow label="Biaya layanan:" value={bookingData.biayaLayanan} />
                  <div className="border-t border-gray-200 pt-4">
                    <BillingRow label="Total:" value={bookingData.totalPembayaran} isTotal={true} />
                  </div>
                </div>

                <div className="flex space-x-3 mt-8">
                  <button 
                    onClick={() => setShowBilling(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                  >
                    Tutup
                  </button>
                  <button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop/Tablet Version */}
      <div className="hidden lg:block fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Detail Booking</h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* ID Booking Card */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center mb-8">
              <div className="text-gray-600 text-sm font-medium mb-2">ID BOOKING</div>
              <div className="text-black text-3xl font-bold">{bookingData.id}</div>
            </div>

            {/* Booking Details */}
            <div className="space-y-5">
              <DetailRow label="Ruangan:" value={bookingData.ruangan} />
              <DetailRow label="Tanggal:" value={bookingData.tanggal} />
              <DetailRow label="Waktu:" value={bookingData.waktu} />
              <DetailRow label="Durasi:" value={bookingData.durasi} />
              <DetailRow label="Kapasitas:" value={bookingData.kapasitas} />
              <DetailRow label="Pemesan:" value={bookingData.pemesan} />
              <DetailRow label="No.HP:" value={bookingData.noHP} />
              <DetailRow label="Harga per jam:" value={bookingData.hargaPerJam} />
              <DetailRow label="Biaya layanan:" value={bookingData.biayaLayanan} />
            </div>

            {/* Total Payment Button */}
            <button 
              onClick={() => setShowBilling(true)}
              className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Total Pembayaran: {bookingData.totalPembayaran}
            </button>
          </div>
        </div>

        {/* Desktop Billing Modal */}
        {showBilling && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
              
              {/* Modal Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">Detail Pembayaran</h3>
                <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
              </div>
              
              {/* Billing Content */}
              <div className="space-y-5">
                <BillingRow label="Harga per jam:" value={bookingData.hargaPerJam} />
                <BillingRow label="Biaya layanan:" value={bookingData.biayaLayanan} />
                <div className="border-t border-gray-200 pt-5">
                  <BillingRow label="Total:" value={bookingData.totalPembayaran} isTotal={true} />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button 
                  onClick={() => setShowBilling(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
                >
                  Tutup
                </button>
                <button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700 font-medium text-sm">{label}</span>
    <span className="text-black font-semibold text-sm text-right">{value}</span>
  </div>
);

const BillingRow = ({ label, value, isTotal = false }) => (
  <div className={`flex justify-between items-center ${isTotal ? 'text-lg' : ''}`}>
    <span className={`${isTotal ? 'font-bold text-black' : 'text-gray-700 font-medium'} text-sm`}>
      {label}
    </span>
    <span className={`${isTotal ? 'font-bold text-black' : 'text-black font-semibold'} text-sm text-right`}>
      {value}
    </span>
  </div>
);


export default DetailBooking;