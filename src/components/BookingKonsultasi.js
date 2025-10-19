import React, { useState, useEffect } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "./BookingKonsultasi.css";

function BookingKonsultasi() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalClasses, setModalClasses] = useState("modal-overlay");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [needs, setNeeds] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() && !phone.trim()) {
      alert("Harap isi salah satu dari Alamat Email atau Nomor Telepon / WhatsApp.");
      return;
    }
    setIsModalVisible(true);
    setName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setDate("");
    setTime("");
    setNeeds("");
  };

  useEffect(() => {
    if (isModalVisible) {
      setModalClasses("modal-overlay");
      const timer = setTimeout(() => {
        setModalClasses("modal-overlay visible");
      }, 10);
      return () => clearTimeout(timer);
    } else {
        setModalClasses("modal-overlay");
    }
  }, [isModalVisible]);

  return (
    <div className="layanan-page">
      <section ref={heroRef} className={`page-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <h1>Booking Konsultasi</h1>
          <p>
            Atur jadwal konsultasi pajak Anda dengan mudah dan cepat bersama tim
            profesional kami.
          </p>
        </div>
      </section>

      <section ref={formRef} className={`page-section section-highlight ${formVisible ? "animate" : ""}`}>
        <div className="container">
          <h2>Formulir Booking</h2>
          <form className="booking-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input type="text" id="name" name="name" placeholder="Masukkan nama lengkap Anda" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon / WhatsApp</label>
              <input type="tel" id="phone" name="phone" placeholder="Contoh: 081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Alamat Email</label>
              <input type="email" id="email" name="email" placeholder="contoh@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="location">Tempat Konsultasi</label>
              <select id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="" disabled>Pilih tempat...</option>
                <option value="Kantor Kami">Kantor Kami</option>
                <option value="Online">Online (Google Meet)</option>
              </select>
            </div>
            <div className="form-group-split">
              <div className="form-group">
                <label htmlFor="date">Pilih Tanggal</label>
                <input type="date" id="date" name="date" required min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="time">Pilih Jam</label>
                <select id="time" name="time" required value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="" disabled>Pilih jam...</option>
                  <option value="09:00">09:00 WIB</option>
                  <option value="10:00">10:00 WIB</option>
                  <option value="11:00">11:00 WIB</option>
                  <option value="13:00">13:00 WIB</option>
                  <option value="14:00">14:00 WIB</option>
                  <option value="15:00">15:00 WIB</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="needs">Kebutuhan Konsultasi</label>
              <textarea id="needs" name="needs" rows="4" placeholder="Jelaskan secara singkat kebutuhan konsultasi Anda (misal: SPT Tahunan, PPh Badan, dll.)" required value={needs} onChange={(e) => setNeeds(e.target.value)}></textarea>
            </div>
            <div className="form-submit-wrapper">
              <button type="submit" className="submit-btn-extreme">
                <span>Ajukan Jadwal</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {isModalVisible && (
        <div className={modalClasses}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>Pengajuan Terkirim!</h3>
            </div>
            <div className="modal-body">
              <p>
                Terima kasih!<br />
                Pengajuan jadwal Anda telah kami terima.<br />
                Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-button"
                onClick={() => setIsModalVisible(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingKonsultasi;
