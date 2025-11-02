import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css';

function FisikaPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
    const { ref: item1Ref, isVisible: item1Visible } = useScrollAnimation();
    const { ref: item2Ref, isVisible: item2Visible } = useScrollAnimation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
                <div className="container">
                    <div className="materi-hero-title-group">
                        <img src="/images/logo_fisika.png" alt="Logo Fisika" className="materi-hero-logo" />
                        <h2>Latihan Soal Fisika</h2>
                    </div>
                </div>
            </section>

            <div className="container back-link-rata-kanan-wrapper">
                <div className="back-link-container">
                    <Link to="/" className="back-link">Kembali ke Beranda</Link>
                </div>
            </div>

            <section ref={listRef} id="daftar-materi" className={`daftar-materi ${listVisible ? "animate" : ""}`}>
                <div className="container">
                    <div className="materi-grid">
                        <Link to="/listrikstatis_mar25-r1" ref={item1Ref} className={`materi-item ${item1Visible ? 'animate' : ''}`}>
                            Listrik Statis <span className="materi-kode">MAR25-R1</span>
                        </Link>
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