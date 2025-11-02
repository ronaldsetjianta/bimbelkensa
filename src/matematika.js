import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; // Menggunakan materi.css

function MatematikaPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Class diubah menjadi materi-hero */}
      <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-hero-title-group"> {/* Class diubah agar konsisten */}
            <img src="/images/logo_matematika.png" alt="Logo Matematika" className="materi-hero-logo" /> {/* Class diubah agar konsisten */}
            <h2>Latihan Soal Matematika</h2>
          </div>
          {/* DITAMBAHKAN: Back-Link (sama seperti Akuntansi) */}
          <div className="back-link-container">
            <Link to="/" className="back-link">Kembali ke Beranda</Link>
          </div>
        </div>
      </section>

      {/* Bagian daftar materi tidak berubah dari versi terakhir */}
      <section ref={listRef} id="daftar-materi" className={`daftar-materi ${listVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-grid">
            <Link to="/functionsandgraphs_lts25-b1" ref={item1Ref} className={`materi-item ${item1Visible ? 'animate' : ''}`}>
              Function and Graphs <span className="materi-kode">LTS25-B1</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default MatematikaPage;