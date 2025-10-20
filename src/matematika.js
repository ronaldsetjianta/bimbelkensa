import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './matematika.css';

function MatematikaPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* PERUBAHAN: Nama kelas diubah menjadi generik */}
      <section ref={heroRef} id="subject-hero" className={`subject-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <img src="/images/logo_matematika.png" alt="Logo Matematika" className="subject-hero-logo" />
          <h2>Latihan Soal Matematika</h2>
        </div>
      </section>

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