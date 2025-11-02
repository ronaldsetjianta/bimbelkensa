import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState(''); // [PERBAIKAN] Mengubah inisialisasi state nama agar tidak menjadi boolean

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // State untuk toggle visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk mengubah state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Langkah 1: Mendaftarkan pengguna (Email & Password) ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registrasi berhasil, tapi data pengguna tidak ditemukan.');

      // Langkah 2: Menyimpan data tambahan (Username, Nama, dan Email) ke tabel 'profiles'
      // PERUBAHAN: Menambahkan 'email' ke dalam objek insert
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id,
            username: username, 
            nama: nama,
            email: email // Menyimpan email ke tabel profiles
          }
        ]);

      if (profileError) throw profileError;

      setMessage('Registrasi berhasil! Anda sekarang bisa login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Daftar</h2>
        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-message">{message}</p>}
        
        <div className="input-group">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Grup input password kini dibungkus */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          {/* Wrapper untuk menampung input dan tombol icon */}
          <div className="password-input-wrapper"> {/* PERUBAHAN NAMA CLASS UNTUK CSS */}
            <input
              // Tipe input diubah berdasarkan state
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Tombol untuk toggle visibilitas */}
            <button 
              type="button" // Penting: 'type="button"' agar tidak men-submit form
              className="password-toggle-btn" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Daftar'}
        </button>
        
        <p className="signup-link">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;