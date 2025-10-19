import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './fisika.css';

function FisikaPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();
  // Tambahkan ref untuk item baru
  const { ref: item2Ref, isVisible: item2Visible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section ref={heroRef} id="fisika-hero" className={`fisika-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <img src="/images/logo_fisika.png" alt="Logo Fisika" className="fisika-hero-logo" />
          {/* PERUBAHAN: Judul diganti */}
          <h2>Latihan Soal Fisika</h2>
        </div>
      </section>

      <section ref={listRef} id="daftar-materi" className={`daftar-materi ${listVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-grid">
            {/* PERUBAHAN: Kode dan tautan diperbarui */}
            <Link to="/listrikstatis_mar25-r1" ref={item1Ref} className={`materi-item ${item1Visible ? 'animate' : ''}`}>
              Listrik Statis <span className="materi-kode">MAR25-R1</span>
            </Link>
            {/* PERUBAHAN: Menu box baru ditambahkan */}
            <Link to="/listrikdinamis_mar25-r1" ref={item2Ref} className={`materi-item ${item2Visible ? 'animate' : ''}`}>
              Listrik Dinamis <span className="materi-kode">MAR25-R1</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default FisikaPage;