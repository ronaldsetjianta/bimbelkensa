import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; 

function ListrikDinamisPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation();
    const { ref: commentRef, isVisible: commentVisible } = useScrollAnimation();

    const answerKeyHTML = `
    Kunci jawaban:<br>
    1.  2000 J<br>
    2.  10 Ω<br>
    3.  200.000.000 elektron
    `;

    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'Admin',
            text: answerKeyHTML,
            replies: []
        }
    ]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const newCommentObject = {
            id: Date.now(),
            author: 'Anda',
            text: newComment,
            replies: []
        };
        setComments([...comments, newCommentObject]);
        setNewComment('');
    };

    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        const newReply = {
            id: Date.now(),
            author: 'Anda',
            text: replyText
        };
        const updatedComments = comments.map(comment => {
            if (comment.id === parentId) {
                return { ...comment, replies: [...comment.replies, newReply] };
            }
            return comment;
        });
        setComments(updatedComments);
        setReplyingTo(null);
        setReplyText('');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* 1. SEGMEN HERO (JUDUL & LOGO) - Tautan Kembali Dihapus dari Sini */}
            <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
                <div className="container">
                    <div className="materi-hero-title-group">
                        <img src="/images/logo_fisika.png" alt="Logo Fisika" className="materi-hero-logo" />
                        <h2>Listrik Dinamis <span className="materi-hero-code">MAR25-R1</span></h2>
                    </div>
                </div>
            </section>

            {/* 2. BACK-LINK (DI LUAR HERO, RATA KANAN) - Ditempatkan di sini */}
            <div className="container back-link-rata-kanan-wrapper">
                <div className="back-link-container">
                    <Link to="/fisika" className="back-link">Kembali ke Latihan Soal Fisika</Link>
                </div>
            </div>

            <section ref={tableRef} id="tabel-soal" className={`tabel-soal ${tableVisible ? "animate" : ""}`}>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>Soal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Hitung energi pada muatan 200 µC pada beda potensial 10 MV!</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Muatan 60 C mengalir melalui kawat dari potensial 25 V ke 30 V dalam waktu 2 menit. Hitung hambatan kawat!</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Berapa jumlah elektron yang mengalir melalui kawat dengan hambatan 2 kΩ, kuat arus 2,5 A, dan energi listrik 0,16 µJ?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section ref={commentRef} id="kolom-komentar" className={`kolom-komentar ${commentVisible ? "animate" : ""}`}>
                <div className="container">
                    <h3>Komentar</h3>
                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="Tulis komentar Anda di sini."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button type="submit">Kirim Komentar</button>
                    </form>

                    <div className="comment-list">
                        {comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <p className="comment-author">{comment.author}</p>
                                <div className="comment-text" dangerouslySetInnerHTML={{ __html: comment.text }} />
                                <button className="reply-button" onClick={() => setReplyingTo(comment.id)}>Reply</button>

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
                                            <button type="button" onClick={() => setReplyingTo(null)}>Batal</button>
                                        </div>
                                    </form>
                                )}

                                {comment.replies.length > 0 && (
                                    <div className="comment-replies">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="reply-item">
                                                <p className="comment-author">{reply.author}</p>
                                                <div className="comment-text" dangerouslySetInnerHTML={{ __html: reply.text }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ListrikDinamisPage;