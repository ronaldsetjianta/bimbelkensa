import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "./LayananIndividu.css";

function LayananIndividu() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: layananRef, isVisible: layananVisible } = useScrollAnimation();
  const { ref: hargaRef, isVisible: hargaVisible } = useScrollAnimation();

  const services = [
    { title: "SPT Tahunan OP", description: "Pelaporan lengkap SPT Tahunan untuk Orang Pribadi sesuai peraturan terbaru." },
    { title: "Konsultasi PPh 21", description: "Bantuan perhitungan dan pelaporan PPh Pasal 21 untuk karyawan atau perorangan." },
    { title: "Kode Billing Pajak", description: "Pembuatan kode billing untuk berbagai jenis setoran pajak pribadi Anda." },
    { title: "Review Kepatuhan", description: "Pemeriksaan dan review kepatuhan pajak pribadi Anda untuk meminimalisir risiko." }
  ];

  return (
    <div className="layanan-page">
      <section ref={heroRef} className={`page-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <h1>Layanan Individu</h1>
          <p>
            Layanan pajak untuk perorangan, dirancang untuk memudahkan Anda
            memenuhi kewajiban pajak pribadi dengan cepat dan tepat.
          </p>
        </div>
      </section>

      {/* Menambahkan kelas 'services-section' untuk penataan jarak yang spesifik */}
      <section ref={layananRef} className={`page-section services-section ${layananVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="layanan-grid">
            {services.map((service, index) => (
              <div key={index} className="layanan-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={hargaRef} className={`page-section section-highlight section-harga ${hargaRef ? "animate" : ""}`}>
        <div className="container">
          <h2>Harga Layanan Individu</h2>
          <p className="description">
            Mulai dari <strong>Rp500.000</strong> per tahun, tergantung<br />kompleksitas laporan dan jumlah dokumen.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LayananIndividu;
