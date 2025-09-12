import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DashboardWS = () => {
  const navigate = useNavigate();
  const { userProfile, login } = useContext(AuthContext);

  // Redirect sesuai role user setelah login
  useEffect(() => {
    if (!userProfile) return;

    if (userProfile.roles === "admin") {
      navigate("/dashboardadmin", { replace: true });
    } else if (userProfile.roles === "kasir") {
      navigate("/mengelola-orderan_fb", { replace: true });
    } else if (userProfile.roles === "user") {
      // user biasa diarahkan ke dashboard-pengguna
      navigate("/dashboard-pengguna", { replace: true });
    }
  }, [userProfile, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8" />
            <span className="font-bold text-lg text-gray-800">Workspace</span>
          </div>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => navigate("/informasiws")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Working Space
            </button>
            <button
              onClick={() => navigate("/informasivo")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Virtual Office
            </button>

            {/* Auth Button */}
            {!userProfile ? (
              <button
                onClick={login}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[80vh] mb-12 pt-16">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="Coworking Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Solusi Coworking & Sewa Kantor Modern
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Fleksibel, nyaman, dan mendukung produktivitas. Pilih ruang kerja
            yang sesuai kebutuhan Anda di Working Space atau Virtual Office.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/informasiws")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition"
            >
              Jelajahi Working Space
            </button>
            <button
              onClick={() => navigate("/informasivo")}
              className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full text-lg font-medium shadow-lg transition"
            >
              Lihat Virtual Office
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16 flex-1">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          WORKSPACE ADALAH PENYEDIA{" "}
          <span className="text-blue-600">COWORKING</span> DAN{" "}
          <span className="text-blue-600">SEWA KANTOR</span> TERDEPAN
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Optimalkan produktivitas tim Anda dengan ruang kerja yang tepat.
          Workspace menyediakan solusi modern, fleksibel, dan komprehensif di
          dunia kerja yang dinamis. Dengan pengalaman melayani bisnis di
          Indonesia, kami menghadirkan ruang kerja fleksibel di berbagai lokasi
          strategis, didukung oleh tim profesional.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Foto grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=600&q=80"
              alt="workspace1"
              className="rounded-xl object-cover h-48 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=600&q=80"
              alt="workspace2"
              className="rounded-xl object-cover h-48 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
              alt="workspace3"
              className="rounded-xl object-cover h-48 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80"
              alt="workspace4"
              className="rounded-xl object-cover h-48 w-full"
            />
          </div>

          {/* Text + CTA */}
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dengan rekam jejak yang terbukti dalam melayani bisnis, Workspace
              adalah mitra terbaik untuk mendukung pertumbuhan perusahaan Anda.
              Kami menyediakan ruang kerja fleksibel, meeting room, hingga
              layanan virtual office.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition"
              >
                Mulai Keanggotaan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Working Space Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=600&q=80"
            alt="Working Space"
            className="rounded-2xl object-cover h-[350px] w-full md:order-1 order-2"
          />
          <div className="bg-purple-50 p-8 rounded-2xl md:order-2 order-1">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              PAKET KEANGGOTAAN
            </h4>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              WORKING SPACE
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nikmati ruang kerja premium di Indonesia tanpa biaya sewa kantor
              jangka panjang. Layanan kami mencakup akses ke open space, meeting
              room, dan fasilitas pendukung produktivitas.
            </p>
            <button
              onClick={() => navigate("/informasiws")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Pelajari Tentang Working Space
            </button>
          </div>
        </div>
      </section>

      {/* Virtual Office Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-purple-50 p-8 rounded-2xl md:order-1 order-2">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              PAKET KEANGGOTAAN
            </h4>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              VIRTUAL OFFICE
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Solusi alamat bisnis profesional di Indonesia tanpa biaya sewa
              kantor. Nikmati layanan alamat utama, manajemen surat, hingga
              fasilitas tambahan lainnya.
            </p>
            <button
              onClick={() => navigate("/informasivo")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Pelajari Tentang Virtual Office
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
            alt="Virtual Office"
            className="rounded-2xl object-cover h-[350px] w-full md:order-2 order-1"
          />
        </div>
      </section>

      {/* Layanan Grid Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Dua Solusi untuk Bisnis Anda: Virtual Office & Working Space
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {[
              {
                title: "WORKING SPACE",
                desc: "Ruang kerja bersama yang nyaman dengan fasilitas lengkap",
                icon: "💼",
                path: "/informasiws",
              },
              {
                title: "VIRTUAL OFFICE",
                desc: "Alamat bisnis profesional dengan tambahan layanan dan fasilitas bersama",
                icon: "🏢",
                path: "/informasivo",
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition cursor-pointer text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Judul + View All link */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Pilih Paket Working Space
            </h2>
            <span
              onClick={() => navigate("/informasiws")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              View All
            </span>
          </div>

          {/* Tiga paket preview */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Open Space - Basic",
                price: "Rp 250.000 / bulan",
                features: ["Kuota 25 credit"],
              },
              {
                name: "Open Space - Standard",
                price: "Rp 400.000 / bulan",
                features: ["Kuota 45 credit"],
              },
              {
                name: "Open Space - Premium",
                price: "Rp 550.000 / bulan",
                features: ["Kuota 70 credit"],
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className="border rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 mb-6">{pkg.price}</p>
                <ul className="mb-6 space-y-2 text-sm text-gray-600">
                  {pkg.features.map((f, j) => (
                    <li key={j}>✔ {f}</li>
                  ))}
                </ul>
                <div className="flex justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
                >
                  Pilih Paket
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Suasana Workspace Kami
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Lihat beberapa momen dan fasilitas yang tersedia di ruang kerja
            kami.
          </p>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1588045625409-f308ed44806a?auto=format&fit=crop&w=800&q=80",
            ].map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`workspace-${i}`}
                  className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Workspace. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/about")}
              className="text-sm hover:text-blue-400"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-sm hover:text-blue-400"
            >
              Kontak
            </button>
            <button
              onClick={() => navigate("/faq")}
              className="text-sm hover:text-blue-400"
            >
              FAQ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardWS;
