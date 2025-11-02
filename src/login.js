import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Mengimpor koneksi supabase
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State untuk toggle visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk mengubah state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Langkah 1: Cari email pengguna berdasarkan username di tabel 'profiles'
      const { data: profileData, error: profileError } = await supabase
        .from('public_profile_login')
        .select('email, id') // Ambil email dan id
        .eq('username', username) // 'eq' berarti 'equals' (sama dengan)
        .single(); // Kita hanya mengharapkan satu hasil

      if (profileError || !profileData) {
        throw new Error('Username tidak ditemukan.');
      }

      // Langkah 2: Jika username ditemukan, gunakan email-nya untuk login
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: profileData.email, // Gunakan email yang kita temukan
        password: password,
      });

      if (signInError) {
        throw new Error('Password salah.');
      }

      // Langkah 3: Jika login berhasil, update 'login_terakhir'
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ login_terakhir: new Date().toISOString() }) // Set ke waktu sekarang
        .eq('id', profileData.id); // Untuk pengguna yang baru saja login

      if (updateError) {
        console.error('Gagal update login_terakhir:', updateError);
      }

      // Langkah 4: Arahkan ke halaman utama
      navigate('/'); 
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>}
        
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
          {loading ? 'Loading...' : 'Login'}
        </button>
        
        <p className="signup-link">
          Belum punya akun? <a href="/signup">Daftar di sini</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;