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
        <button onClick={() => goToSection("hero")} className="logo-button">
          <img src="/images/logo.png" alt="Logo Belajar" className="logo-image" />
        </button>
        <nav>
          <button onClick={() => goToSection("hero")}>Beranda</button>
          <div
            className="nav-item"
            onMouseEnter={() => setIsLayananOpen(true)}
            onMouseLeave={() => setIsLayananOpen(false)}
          >
            <button onClick={() => goToSection("layanan")}>Program</button>
            {isLayananOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/layanan-individu">Kelas SD & SMP</Link></li>
                <li><Link to="/layanan-perusahaan">Kelas SMA & Persiapan PTN</Link></li>
                <li><Link to="/booking-konsultasi">Daftar & Konsultasi</Link></li>
              </ul>
            )}
          </div>
          <button onClick={() => goToSection("tentang")}>Guru Kami</button>
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
            <Link to="/" className="layanan-item-link">
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
          <h2>Kenali Guru Kami</h2>
          <p>
            Semua tutor kami adalah lulusan universitas ternama dan memiliki pengalaman bertahun-tahun dalam membimbing siswa meraih prestasi terbaik. Kami fokus pada metode pengajaran yang personal dan adaptif, memastikan setiap siswa mendapatkan perhatian penuh sesuai gaya belajarnya.
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="var(--color-primary)"><path d="M12.0003 2C6.48625 2 2.00031 6.486 2.00031 12C2.00031 17.514 6.48625 22 12.0003 22H18.0003C19.8663 22 21.3783 20.627 21.8493 18.887L22.0003 18V12C22.0003 6.486 17.5143 2 12.0003 2ZM18.0003 20H12.0003C7.58931 20 4.00031 16.411 4.00031 12C4.00031 7.589 7.58931 4 12.0003 4C16.4113 4 20.0003 7.589 20.0003 12V18L18.0003 19.957V20ZM12.0003 16C10.8953 16 10.0003 15.104 10.0003 14V10C10.0003 8.896 10.8953 8 12.0003 8C13.1053 8 14.0003 8.896 14.0003 10V14C14.0003 15.104 13.1053 16 12.0003 16Z" /></svg>
                </div>
                <h3>WhatsApp</h3>
                <p>+62 897 3866 970</p>
              </div>
            </a>
            <a href="mailto:bimbelkensa@gmail.com" className="kontak-item-link">
              <div className="kontak-item">
                <div className="kontak-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="var(--color-secondary)"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 6L12 11L4 6H20ZM4 18V7.38L12 12.38L20 7.38V18H4Z" /></svg>
                </div>
                <h3>Email</h3>
                <p>bimbelkensa@gmail.com</p>
              </div>
            </a>
            {/* PERUBAHAN: div diubah menjadi <a> dengan link Google Maps */}
            <a href="https://www.google.com/maps/search/?api=1&query=Kendangsari+6+No.+42,+Surabaya" target="_blank" rel="noopener noreferrer" className="kontak-item-link">
              <div className="kontak-item">
                <div className="kontak-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="var(--color-primary)"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" /></svg>
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
            <Route path="/layanan-individu" element={<LayananIndividu />} />
            <Route path="/layanan-perusahaan" element={<LayananPerusahaan />} />
            <Route path="/booking-konsultasi" element={<BookingKonsultasi />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;