import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './kimia.css';

function KimiaPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();
  const { ref: item2Ref, isVisible: item2Visible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* PERUBAHAN: Nama kelas diubah menjadi generik */}
      <section ref={heroRef} id="subject-hero" className={`subject-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <img src="/images/logo_kimia.png" alt="Logo Kimia" className="subject-hero-logo" />
          <h2>Materi Kimia</h2>
        </div>
      </section>

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