import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; 

function ListrikStatisPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation();
  const { ref: commentRef, isVisible: commentVisible } = useScrollAnimation();

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Admin',
      text: (
        <>
          Kunci jawaban:
          <br />
          1.  4,05 × 10<sup>5</sup> N
          <br />
          2.  4 × 10<sup>-3</sup> C
          <br />
          3.  6 cm
          <br />
          4.  <sup>3</sup>&frasl;<sub>2</sub>
          <br />
          5.  8
          <br />
          6.  <sup>1</sup>&frasl;<sub>4</sub>
          <br />
          7.  3
          <br />
          8.  4,5 × 10<sup>5</sup> N/C
          <br />
          9.  5
        </>
      ),
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
      <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-hero-title-group">
            <img src="/images/logo_fisika.png" alt="Logo Fisika" className="materi-hero-logo" />
            <h2>Listrik Statis <span className="materi-hero-code">MAR25-R1</span></h2>
          </div>
          <div className="back-link-container">
            <Link to="/fisika" className="back-link">Kembali ke halaman Fisika</Link>
          </div>
        </div>
      </section>

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
                <td>Hitung gaya elektrostatis pada muatan 3 mC dengan 6 µC yang berjarak 2 cm!</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Dua muatan identik mengalami gaya elektrostatis 1,6 × 10<sup>10</sup> N pada jarak 3 mm. Hitung besar masing-masing muatan!</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Pada jarak berapakah muatan 3,6 × 10<sup>7</sup> statC dengan muatan 1,5 × 10<sup>4</sup> statC harus diletakkan agar mengalami gaya elektrostatis sebesar 1,5 × 10<sup>10</sup> dyne?</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Jika muatan pertama dijadikan dua kali semula, muatan kedua dijadikan tiga kali semula, dan jarak antara kedua muatan dijadikan dua kali semula, maka <i>F</i> sekarang = ... × <i>F</i> mula-mula.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Jika muatan pertama tetap, muatan kedua dijadikan dua kali semula, dan jarak antara kedua muatan dijadikan setengah kali semula, maka <i>F</i> sekarang = ... × <i>F</i> mula-mula.</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Jika muatan pertama dijadikan empat kali semula, muatan kedua dijadikan setengah kali semula, dan <i>F</i> sekarang = 32 × <i>F</i> mula-mula, maka jarak sekarang = ... × jarak mula-mula.</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Jika muatan pertama dijadikan dua kali semula, muatan kedua dijadikan tiga kali semula, dan <i>F</i> sekarang = <sup>2</sup>&frasl;<sub>3</sub> × <i>F</i> mula-mula, maka jarak sekarang = ... × jarak mula-mula.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Hitung kuat medan listrik pada sebuah titik yang berjarak 2 cm dari muatan 2 × 10<sup>-2</sup> µC!</td>
              </tr>
              <tr>
                <td>9</td>
                {/* PERUBAHAN: Tanda perkalian ditambahkan */}
                <td>Jika <i>E</i> sekarang = <sup>1</sup>&frasl;<sub>25</sub> × <i>E</i> mula-mula, maka jarak sekarang = ... × jarak mula-mula.</td>
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
              placeholder="Tulis komentar Anda di sini..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="submit">Kirim Komentar</button>
          </form>

          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <p className="comment-author">{comment.author}</p>
                <div className="comment-text preserve-space">{comment.text}</div>
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
                        <div className="comment-text preserve-space">{reply.text}</div>
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

export default ListrikStatisPage;