import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; // Menggunakan materi.css

function AkuntansiPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Class 'materi-hero' bekerja dengan materi.css */}
      <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-hero-title-group">
            <img src="/images/logo_akuntansi.png" alt="Logo Akuntansi" className="materi-hero-logo" />
            <h2>Materi Akuntansi</h2>
          </div>
          <div className="back-link-container">
            <Link to="/" className="back-link">Kembali ke Beranda</Link>
          </div>
        </div>
      </section>

      {/* Menggunakan Class daftar-materi/materi-grid */}
      <section ref={listRef} id="daftar-materi" className={`daftar-materi ${listVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-grid">
            <Link 
              to="/sahambiasapreferen" 
              ref={item1Ref} 
              className={`materi-item ${item1Visible ? 'animate' : ''}`}
            >
              Saham Biasa dan Saham Preferen <span className="materi-kode">RON</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AkuntansiPage;