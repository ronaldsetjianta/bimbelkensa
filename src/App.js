import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ChatBox from "./components/ChatBox";
import LayananPerusahaan from "./components/LayananPerusahaan";
import LayananIndividu from "./components/LayananIndividu";
import BookingKonsultasi from "./components/BookingKonsultasi";
import ScrollToTop from "./components/ScrollToTop";
import useScrollAnimation from "./hooks/useScrollAnimation";
import "./App.css";
import FisikaPage from "./fisika";
import ListrikStatisPage from "./listrikstatis_mar25-r1";
import ListrikDinamisPage from "./listrikdinamis_mar25-r1";
import MatematikaPage from "./matematika";

// PERUBAHAN 1: Import komponen baru
import FunctionAndGraphsPage from "./functionsandgraphs_lts25-b1";


const scrollToElement = (elementId) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 0);
};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  const goToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToElement(id);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-group">
          <button onClick={() => goToSection("hero")} className="logo-text-button">
            <span className="logo-text-left">Bimbel</span>
          </button>
          <button onClick={() => goToSection("hero")} className="logo-button">
            <img src="/images/logo.png" alt="Logo Belajar" className="logo-image" />
          </button>
          <button onClick={() => goToSection("hero")} className="logo-text-button">
            <span className="logo-text-right">Kensa</span>
          </button>
        </div>
        <nav>
          <button onClick={() => goToSection("hero")}>Beranda</button>
          <div
            className="nav-item"
            onMouseEnter={() => setIsLayananOpen(true)}
            onMouseLeave={() => setIsLayananOpen(false)}
          >
            <button onClick={() => goToSection("layanan")}>Pendaftaran</button>
            {isLayananOpen && (
              <ul className="dropdown-menu">
                <li><Link to="#" onClick={(e) => e.preventDefault()}>SD, SMP, SMA/SMK</Link></li>
                <li><Link to="#" onClick={(e) => e.preventDefault()}>Persiapan Tes Masuk Perguruan Tinggi</Link></li>
                <li><Link to="#" onClick={(e) => e.preventDefault()}>Kalkulus, Fisika (Perguruan Tinggi)</Link></li>
                <li><Link to="#" onClick={(e) => e.preventDefault()}>Konsultasi Tugas Akhir (Skripsi)</Link></li>
              </ul>
            )}
          </div>
          <button onClick={() => goToSection("tentang")}>Tentang Kami</button>
          <button onClick={() => goToSection("kontak")}>Hubungi Kami</button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Bimbel Kensa</p>
      </div>
    </footer>
  );
}


function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToElement(location.state.scrollTo);
    }
  }, [location.state]);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: layananSectionRef, isVisible: layananVisible } = useScrollAnimation();
  const { ref: tentangRef, isVisible: tentangVisible } = useScrollAnimation();
  const { ref: kontakRef, isVisible: kontakVisible } = useScrollAnimation();

  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();
  const { ref: item2Ref, isVisible: item2Visible } = useScrollAnimation();
  const { ref: item3Ref, isVisible: item3Visible } = useScrollAnimation();
  const { ref: item4Ref, isVisible: item4Visible } = useScrollAnimation();
  const { ref: item5Ref, isVisible: item5Visible } = useScrollAnimation();
  const { ref: item6Ref, isVisible: item6Visible } = useScrollAnimation();

  return (
    <>
      <section ref={heroRef} id="hero" className={`hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="quote-container">
            <h1>"Keberhasilan bukanlah milik orang yang pintar. Keberhasilan adalah kepunyaan mereka yang senantiasa berusaha."</h1>
            <p className="quote-author">B.J. Habibie</p>
          </div>
        </div>
      </section>

      <section ref={layananSectionRef} id="layanan" className={`layanan ${layananVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="layanan-grid">
            <Link to="/matematika" className="layanan-item-link">
              <div ref={item1Ref} className={`layanan-item ${item1Visible ? "animate" : ""}`}>
                <img src="/images/logo_matematika.png" alt="Logo Matematika" className="layanan-item-image" />
              </div>
            </Link>

            <Link to="/fisika" className="layanan-item-link">
              <div ref={item2Ref} className={`layanan-item ${item2Visible ? "animate" : ""}`}>
                <img src="/images/logo_fisika.png" alt="Logo Fisika" className="layanan-item-image" />
              </div>
            </Link>

            <Link to="/" className="layanan-item-link">
              <div ref={item3Ref} className={`layanan-item ${item3Visible ? "animate" : ""}`}>
                <img src="/images/logo_kimia.png" alt="Logo Kimia" className="layanan-item-image" />
              </div>
            </Link>

            <Link to="/" className="layanan-item-link">
              <div ref={item4Ref} className={`layanan-item ${item4Visible ? "animate" : ""}`}>
                <img src="/images/logo_akuntansi.png" alt="Logo Ekonomi" className="layanan-item-image" />
              </div>
            </Link>

            <Link to="/" className="layanan-item-link">
              <div ref={item5Ref} className={`layanan-item ${item5Visible ? "animate" : ""}`}>
                <img src="/images/logo_bahasainggris.png" alt="Logo Bahasa Inggris" className="layanan-item-image" />
              </div>
            </Link>

            <Link to="/" className="layanan-item-link">
              <div ref={item6Ref} className={`layanan-item ${item6Visible ? "animate" : ""}`}>
                <img src="/images/logo_tahukahkamu.png" alt="Logo Tahukah Kamu?" className="layanan-item-image" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section ref={tentangRef} id="tentang" className={`tentang ${tentangVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Tentang Kami</h2>
          <p>
            Bimbel Kensa adalah bimbingan belajar dengan pengajar yang memiliki pengalaman lebih dari 20 tahun dalam membimbing siswa dan mahasiswa meraih prestasi terbaik. Metode pengajaran kami personal dan adaptif, namun tegas dan disiplin untuk memastikan setiap siswa dan mahasiswa mencapai potensi maksimal dengan daya juang yang tinggi.
          </p>
        </div>
      </section>

      <section ref={kontakRef} id="kontak" className={`kontak ${kontakVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Hubungi Kami</h2>
          <div className="kontak-grid">
            <a href="https://wa.me/628973866970" target="_blank" rel="noopener noreferrer" className="kontak-item-link">
              <div className="kontak-item">
                <div className="kontak-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                </div>
                <h3>WhatsApp</h3>
                <p>+62 897 3866 970</p>
              </div>
            </a>
            <a href="mailto:bimbelkensa@gmail.com" className="kontak-item-link">
              <div className="kontak-item">
                <div className="kontak-icon">
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.36C43.92 37.63 46.98 31.48 46.98 24.55z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.36c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                </div>
                <h3>Email</h3>
                <p>bimbelkensa@gmail.com</p>
              </div>
            </a>
            <a href="http://maps.google.com/?q=Kendangsari 6 No. 42, Surabaya" target="_blank" rel="noopener noreferrer" className="kontak-item-link">
              <div className="kontak-item">
                <div className="kontak-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#4285F4" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 0 1-35.464 0z"/><circle fill="#FFFFFF" cx="192" cy="192" r="64"/></svg>
                </div>
                <h3>Alamat</h3>
                <p>Kendangsari 6 No. 42, Surabaya</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fisika" element={<FisikaPage />} />
            <Route path="/listrikstatis_mar25-r1" element={<ListrikStatisPage />} />
            <Route path="/listrikdinamis_mar25-r1" element={<ListrikDinamisPage />} />
            <Route path="/matematika" element={<MatematikaPage />} />
            {/* PERUBAHAN 2: Menambahkan route baru */}
            <Route path="/functionsandgraphs_lts25-b1" element={<FunctionAndGraphsPage />} />
            <Route path="/layanan-individu" element={<LayananIndividu />} />
            <Route path="/layanan-perusahaan" element={<LayananPerusahaan />} />
            <Route path="/booking-konsultasi" element={<BookingKonsultasi />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;