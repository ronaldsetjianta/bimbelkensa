import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "./LayananPerusahaan.css"; 

function LayananPerusahaan() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: bulananRef, isVisible: bulananVisible } = useScrollAnimation();
  const { ref: tahunanRef, isVisible: tahunanVisible } = useScrollAnimation();
  const { ref: khususRef, isVisible: khususVisible } = useScrollAnimation();
  const { ref: hargaRef, isVisible: hargaVisible } = useScrollAnimation();

  const monthlyServices = [
    { title: "Perhitungan PPh & PPN", description: "Analisis transaksi dan perhitungan akurat untuk PPh dan PPN bulanan." },
    { title: "Pelaporan SPT Masa", description: "Penyusunan dan pelaporan SPT Masa PPh & PPN tepat waktu setiap bulan." },
    { title: "Pembuatan Kode Billing", description: "Pembuatan kode billing untuk semua jenis setoran pajak perusahaan." }
  ];

  const yearlyServices = [
    { title: "Laporan Keuangan", description: "Penyusunan laporan keuangan tahunan (Neraca, Laba Rugi) sesuai standar." },
    { title: "SPT Tahunan Badan", description: "Pelaporan SPT Tahunan Badan lengkap sebelum batas waktu yang ditentukan." },
    { title: "Review Kepatuhan", description: "Review menyeluruh atas kepatuhan pajak perusahaan selama satu tahun." }
  ];

  const specialServices = [
    { title: "Perencanaan Pajak", description: "Strategi untuk efisiensi beban pajak perusahaan Anda secara legal." },
    { title: "Pendampingan", description: "Pendampingan profesional saat proses pemeriksaan pajak oleh fiskus." },
    { title: "Konsultasi Kasus", description: "Solusi dan konsultasi untuk kasus atau sengketa pajak yang spesifik." }
  ];

  return (
    <div className="layanan-page">
      <section ref={heroRef} className={`page-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <h1>Layanan Perusahaan</h1>
          <p>
            Solusi lengkap untuk pengelolaan pajak perusahaan Anda, mulai dari
            perhitungan, pelaporan, hingga konsultasi strategis.
          </p>
        </div>
      </section>

      {/* --- PERUBAHAN DI SINI: Menambahkan kelas "company-service-section" --- */}
      <section ref={bulananRef} className={`page-section company-service-section ${bulananVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Layanan Bulanan</h2>
          <div className="layanan-grid">
            {monthlyServices.map((service, index) => (
              <div key={index} className="layanan-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={tahunanRef} className={`page-section section-highlight company-service-section ${tahunanVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Layanan Tahunan</h2>
          <div className="layanan-grid">
            {yearlyServices.map((service, index) => (
              <div key={index} className="layanan-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={khususRef} className={`page-section company-service-section ${khususVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Layanan Khusus</h2>
          <div className="layanan-grid">
            {specialServices.map((service, index) => (
              <div key={index} className="layanan-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={hargaRef} className={`page-section section-highlight ${hargaRef ? "animate" : ""}`}>
        <div className="container">
          <h2>Harga Layanan Perusahaan</h2>
          <p className="description">
            Paket layanan perusahaan mulai dari <strong>Rp 2.000.000</strong> per bulan,<br />disesuaikan dengan skala dan kompleksitas usaha Anda.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LayananPerusahaan;

