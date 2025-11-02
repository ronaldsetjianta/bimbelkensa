import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; 

function CommonIonsPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: imageSectionRef, isVisible: imageSectionVisible } = useScrollAnimation(); 
    const { ref: commentRef, isVisible: commentVisible } = useScrollAnimation();

    const answerKeyHTML = `
    Ingat bahwa ini hanya daftar ion yang umum. Masih banyak ion lain yang tidak tercantum.
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
                        <img src="/images/logo_kimia.png" alt="Logo Kimia" className="materi-hero-logo" />
                        <h2>Common Ions<span className="materi-hero-code">RON</span></h2>
                    </div>
                </div>
            </section>

            {/* 2. BACK-LINK (DI LUAR HERO, RATA KANAN) - Ditempatkan di sini */}
            <div className="container back-link-rata-kanan-wrapper">
                <div className="back-link-container">
                    <Link to="/kimia" className="back-link">Kembali ke Materi Kimia</Link>
                </div>
            </div>

            {/* Bagian gambar */}
            <section ref={imageSectionRef} id="image-content" className={`image-content ${imageSectionVisible ? "animate" : ""}`}>
                <div className="container">
                    {/* Gambar acak placeholder, Anda dapat menggantinya nanti */}
                    <img src="/images/logo_kimia.png" alt="Common Ions" style={{maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto'}} />
                    <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.9em', color: '#666'}}>
                    </p>
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

export default CommonIonsPage;