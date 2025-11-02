import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css';
import { supabase } from './supabaseClient';
import { useAuth } from './hooks/useAuth';

// FUNGSI UTILITY: Memformat waktu ke GMT+7
const formatTime = (timestamp) => {
    if (!timestamp) return 'Tepat Sekarang';

    // Opsi formatting: 1 Jan 2025 10:30
    const options = {
        year: 'numeric',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Menggunakan format 24 jam
        timeZone: 'Asia/Jakarta' // Set zona waktu ke GMT+7 (WIB)
    };

    // Menghilangkan koma yang dihasilkan oleh toLocaleTimeString setelah tahun
    return new Date(timestamp).toLocaleTimeString('id-ID', options).replace(',', '');
};


function SahamBiasaPreferenPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation();
    const { ref: commentRef, isVisible: commentVisible } = useScrollAnimation();

    // Tentukan ID unik untuk halaman ini
    const MATERI_ID = "sahambiasapreferen";

    const { user, profile, isAuthLoading } = useAuth(); 

    // State komentar
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    // State untuk fitur Edit
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');

    // FUNGSI FETCH KOMENTAR (DITAMBAH SORTING DESCENDING)
    const fetchComments = useCallback(async () => {
        const { data, error } = await supabase.rpc('get_comments_by_materi', {
            p_materi_id: MATERI_ID
        });

        if (error) {
            console.error('Error fetching comments via RPC:', error);
            return;
        }

        if (!data) {
            setComments([]);
            return;
        }

        // Proses data (flat) menjadi (nested)
        const commentsById = {};
        let topLevelComments = [];

        data.forEach(comment => {
            const authorName = comment.profiles ? comment.profiles.nama : 'User Anonim';
            commentsById[comment.id] = { ...comment, replies: [], author: authorName };
        });

        data.forEach(comment => {
            if (comment.parent_id) {
                if (commentsById[comment.parent_id]) {
                    commentsById[comment.parent_id].replies.push(commentsById[comment.id]);
                }
            } else {
                topLevelComments.push(commentsById[comment.id]);
            }
        });

        // 1. SORTIR BALASAN (REPLIES) SECARA DESCENDING
        Object.values(commentsById).forEach(comment => {
            if (comment.replies.length > 0) {
                comment.replies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
        });

        // 2. SORTIR KOMENTAR TOP LEVEL SECARA DESCENDING
        topLevelComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setComments(topLevelComments);
    }, [MATERI_ID]);

    // FUNGSI 'Edit' (Masuk ke mode edit)
    const handleEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.text);
    };

    // FUNGSI 'KIRIM KOMENTAR'
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user || !user.id) {
            console.error("Gagal mengirim komentar: User atau User ID tidak ditemukan.");
            return;
        }

        const { error } = await supabase
            .from('comments')
            .insert({
                text: newComment,
                user_id: user.id,
                materi_id: MATERI_ID,
                parent_id: null
            });

        if (error) {
            console.error('Error submitting comment:', error.message);
        } else {
            setNewComment('');
            fetchComments();
        }
    };

    // FUNGSI 'KIRIM BALASAN'
    const handleReplySubmit = async (e, parentId) => {
        e.preventDefault();
        if (!replyText.trim() || !user || !user.id) {
            console.error("Gagal mengirim balasan: User atau User ID tidak ditemukan.");
            return;
        }

        const { error } = await supabase
            .from('comments')
            .insert({
                text: replyText,
                user_id: user.id,
                materi_id: MATERI_ID,
                parent_id: parentId
            });

        if (error) {
            console.error('Error submitting reply:', error.message);
        } else {
            setReplyText('');
            setReplyingTo(null);
            fetchComments();
        }
    };

    // FUNGSI 'Delete' (Soft Delete)
    const handleDelete = async (commentId) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) return;

        const { error } = await supabase
            .from('comments')
            .update({ status: 'Dihapus' })
            .eq('id', commentId);

        if (error) {
            console.error('Error deleting comment:', error.message);
        } else {
            fetchComments();
        }
    };

    // FUNGSI 'Update' (Kirim perubahan hasil edit)
    const handleUpdateSubmit = async (e, commentId) => {
        e.preventDefault();
        if (!editText.trim()) return;

        const { error } = await supabase
            .from('comments')
            .update({ text: editText })
            .eq('id', commentId);

        if (error) {
            console.error('Error updating comment:', error.message);
        } else {
            setEditingCommentId(null);
            setEditText('');
            fetchComments();
        }
    };

    // Panggil fetchComments saat halaman dimuat
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchComments();
    }, [fetchComments]);

    // PENANGANAN LOADING
    if (isAuthLoading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                Memuat data pengguna...
            </div>
        );
    }

    return (
        <>
            {/* 1. SEGMEN HERO (JUDUL & LOGO) - Tautan Kembali Dihapus dari Sini */}
            <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
                <div className="container">
                    <div className="materi-hero-title-group">
                        <img src="/images/logo_akuntansi.png" alt="Logo Akuntansi" className="materi-hero-logo" />
                        <h2>Saham Biasa dan Saham Preferen<span className="materi-hero-code">RON</span></h2>
                    </div>
                </div>
            </section>

            {/* 2. BACK-LINK (DI LUAR HERO, RATA KANAN) - Ditempatkan di sini */}
            <div className="container back-link-rata-kanan-wrapper">
                <div className="back-link-container">
                    <Link to="/akuntansi" className="back-link">Kembali ke Materi Akuntansi</Link>
                </div>
            </div>

            <section ref={tableRef} id="tabel-soal" className={`tabel-soal ${tableVisible ? "animate" : ""}`}>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>Perbandingan</th>
                                <th style={{ width: '300px' }}>Saham Biasa (<i>Common Stock</i>)</th>
                                <th style={{ width: '300px' }}>Saham Preferen (<i>Preferred Stock</i>)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pembelian</td>
                                <td>Diperdagangkan secara publik di bursa saham.</td>
                                <td>Diterbitkan bukan melalui mekanisme perdagangan reguler.</td>
                            </tr>
                            <tr>
                                <td>Prioritas Pembagian Dividen</td>
                                <td>Bukan prioritas. Menerima dividen setelah pemegang saham preferen.</td>
                                <td>Prioritas. Menerima dividen sebelum pemegang saham biasa.</td>
                            </tr>
                            <tr>
                                <td>Besar Dividen</td>
                                <td>Dapat berubah. Tergantung keputusan RUPS setiap tahun.</td>
                                <td>Persentase tetap dari nilai nominal saham.</td>
                            </tr>
                            <tr>
                                <td>Hak Suara</td>
                                <td>Memiliki hak suara untuk memilih dewan direksi dan menentukan kebijakan perusahaan melalui RUPS.</td>
                                <td>Tidak memiliki hak suara, kecuali dalam pengambilan keputusan yang memengaruhi pemegang saham preferen.</td>
                            </tr>
                            <tr>
                                <td>Likuiditas</td>
                                <td>Tinggi. Mudah dibeli dan dijual di bursa saham.</td>
                                <td>Rendah. Jumlah saham yang beredar lebih sedikit.</td>
                            </tr>
                            <tr>
                                <td>Konvertibilitas</td>
                                <td>Tidak dapat dikonversi menjadi saham preferen.</td>
                                <td>Dapat dikonversi menjadi saham biasa dengan rasio tertentu. Umumnya satu saham preferen menjadi lebih dari satu saham biasa.</td>
                            </tr>
                            <tr>
                                <td>Klaim Aset saat Likuidasi</td>
                                <td>Bukan prioritas. Mendapatkan sisa aset setelah pemegang saham preferen dibayar.</td>
                                <td>Prioritas. Mendapatkan klaim aset sebelum pemegang saham biasa.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section ref={commentRef} id="kolom-komentar" className={`kolom-komentar ${commentVisible ? "animate" : ""}`}>
                <div className="container">
                    <h3>Komentar</h3>

                    {/* Form kirim komentar (hanya tampil jika user ada dan id-nya valid) */}
                    {user && user.id ? (
                        <form className="comment-form" onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="Tulis komentar Anda di sini."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button type="submit">Kirim Komentar</button>
                        </form>
                    ) : (
                        <p className="login-prompt">Silakan <Link to="/login">login</Link> untuk berkomentar.</p>
                    )}

                    {/* Daftar Komentar */}
                    <div className="comment-list">
                        {comments.map(comment => {
                            // Logika izin (Admin atau Pemilik)
                            const canModify = user && (user.id === comment.user_id || profile?.role === 'admin');

                            return (
                                <div key={comment.id} className="comment-item">
                                    <p className="comment-author">
                                        {comment.author} 
                                        <span style={{
                                            fontSize: '0.8em', 
                                            fontWeight: 'normal', 
                                            color: '#6c757d',
                                            marginLeft: '10px',
                                            verticalAlign: '1.1px'
                                        }}>
                                            {formatTime(comment.created_at)}
                                        </span>
                                    </p>

                                    {/* Tampilkan form edit atau teks biasa */}
                                    {editingCommentId === comment.id ? (
                                        <form className="edit-form" onSubmit={(e) => handleUpdateSubmit(e, comment.id)}>
                                            <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                autoFocus
                                            ></textarea>
                                            <div>
                                                <button type="submit">Simpan</button>
                                                <button type="button" onClick={() => setEditingCommentId(null)}>Batal</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="comment-text" dangerouslySetInnerHTML={{ __html: comment.text }} />
                                    )}

                                    {/* Tombol Aksi (Reply, Edit, Delete) */}
                                    {user && editingCommentId !== comment.id && (
                                        <div className="comment-actions">
                                            <button className="reply-button" onClick={() => setReplyingTo(comment.id)}>Reply</button>

                                            {/* Tampilkan Edit/Delete jika diizinkan */}
                                            {canModify && (
                                                <>
                                                    <button 
                                                        className="edit-button" 
                                                        onClick={() => handleEdit(comment)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="delete-button" onClick={() => handleDelete(comment.id)}>Delete</button>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Form Balasan (Reply) */}
                                    {replyingTo === comment.id && (
                                        <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                                            <textarea
                                                placeholder={`Membalas ${comment.author}...`}
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                autoFocus
                                            ></textarea>
                                            <div>
                                                <button type="submit">Kirim Balasan</button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setReplyingTo(null);
                                                        setReplyText(''); 
                                                    }}
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Daftar Balasan (Replies) */}
                                    {comment.replies.length > 0 && (
                                        <div className="comment-replies">
                                            {comment.replies.map(reply => {
                                                const canModifyReply = user && (user.id === reply.user_id || profile?.role === 'admin');

                                                return (
                                                    <div key={reply.id} className="reply-item">
                                                        <p className="comment-author">
                                                            {reply.author} 
                                                            <span style={{
                                                                fontSize: '0.8em', 
                                                                fontWeight: 'normal', 
                                                                color: '#6c757d',
                                                                marginLeft: '10px',
                                                                verticalAlign: '1.1px'
                                                            }}>
                                                                {formatTime(reply.created_at)}
                                                            </span>
                                                        </p>

                                                        {/* Form Edit untuk Balasan */}
                                                        {editingCommentId === reply.id ? (
                                                            <form className="edit-form" onSubmit={(e) => handleUpdateSubmit(e, reply.id)}>
                                                                <textarea
                                                                    value={editText}
                                                                    onChange={(e) => setEditText(e.target.value)}
                                                                    autoFocus
                                                                ></textarea>
                                                                <div>
                                                                    <button type="submit">Simpan</button>
                                                                    <button type="button" onClick={() => setEditingCommentId(null)}>Batal</button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <div className="comment-text" dangerouslySetInnerHTML={{ __html: reply.text }} />
                                                        )}

                                                        {/* Tombol Aksi untuk Balasan (Edit/Delete) */}
                                                        {user && canModifyReply && editingCommentId !== reply.id && (
                                                            <div className="comment-actions">
                                                                <button 
                                                                    className="edit-button" 
                                                                    onClick={() => handleEdit(reply)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button className="delete-button" onClick={() => handleDelete(reply.id)}>Delete</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default SahamBiasaPreferenPage;