import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; // MENGARAHKAN KE MATERI.CSS

function KimiaPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();
  // Catatan: item2Ref dihapus karena tidak digunakan di JSX.
  // const { ref: item2Ref, isVisible: item2Visible } = useScrollAnimation(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* PERUBAHAN: Menggunakan class 'materi-hero' dan struktur dua kolom */}
      <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          {/* DITAMBAHKAN: Wrapper untuk Logo dan Judul */}
          <div className="materi-hero-title-group">
            <img src="/images/logo_kimia.png" alt="Logo Kimia" className="materi-hero-logo" />
            <h2>Materi Kimia</h2>
          </div>
          {/* DITAMBAHKAN: Back-Link (Wajib ada untuk konsistensi dua kolom) */}
          <div className="back-link-container">
            <Link to="/" className="back-link">Kembali ke Beranda</Link>
          </div>
        </div>
      </section>

      {/* TETAP: Menggunakan Class daftar-materi/materi-grid */}
      <section ref={listRef} id="daftar-materi" className={`daftar-materi ${listVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-grid">
            <Link to="/commonions" ref={item1Ref} className={`materi-item ${item1Visible ? 'animate' : ''}`}>
              Common Ions <span className="materi-kode">RON</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default KimiaPage;