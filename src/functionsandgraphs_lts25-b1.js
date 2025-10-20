import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from './hooks/useScrollAnimation';
import './materi.css'; 

function FunctionAndGraphsPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation();
  const { ref: commentRef, isVisible: commentVisible } = useScrollAnimation();

  const answerKeyHTML = `
    Kunci jawaban:<br>
    1.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    2.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    3.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    4.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    5.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    6.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    7.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    8.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    9.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)<br>
    10.&nbsp;&nbsp;(Kunci jawaban akan ditambahkan di sini)
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
      <section ref={heroRef} id="materi-hero" className={`materi-hero ${heroVisible ? "animate" : ""}`}>
        <div className="container">
          <div className="materi-hero-title-group">
            <img src="/images/logo_matematika.png" alt="Logo Matematika" className="materi-hero-logo" />
            <h2>Function and Graphs <span className="materi-hero-code">LTS25-B1</span></h2>
          </div>
          <div className="back-link-container">
            <Link to="/matematika" className="back-link">Kembali ke Latihan Soal Matematika</Link>
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
                <td>
                  Copy the diagram below and complete the following.
                  {/* PERUBAHAN: Ekstensi file diubah ke .jpeg */}
                  <img src="/images/matematika/functionsandgraphs_lts25-b1_01.jpeg" alt="Diagram for question 1" className="soal-gambar" />
                  (a){'\u00A0\u00A0'}Point <i>P</i> is translated to <i>P</i><sub>1</sub> by 2 units to the right and 1 unit up. Draw and label the point <i>P</i><sub>1</sub>.
                  <br/>
                  (b){'\u00A0\u00A0'}∆<i>ABC</i> is translated to ∆<i>A</i><sub>1</sub><i>B</i><sub>1</sub><i>C</i><sub>1</sub> by 2 units to the left and 1 unit up. Draw and label ∆<i>A</i><sub>1</sub><i>B</i><sub>1</sub><i>C</i><sub>1</sub>.
                  <br/>
                  (c){'\u00A0\u00A0'}<i>A</i> translation represented by the vector <div className="vector"><span>3</span><span>–3</span></div> maps <i>P</i> onto <i>P</i><sub>2</sub>. Draw and label the point <i>P</i><sub>2</sub>.
                  <br/>
                  (d){'\u00A0\u00A0'}<i>A</i> translation represented by the vector <div className="vector"><span>1</span><span>–3</span></div> maps ∆<i>ABC</i> onto ∆<i>A</i><sub>2</sub><i>B</i><sub>2</sub><i>C</i><sub>2</sub>. Draw and label ∆<i>A</i><sub>2</sub><i>B</i><sub>2</sub><i>C</i><sub>2</sub>.
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>3</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>4</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>5</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>6</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>7</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>8</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>9</td>
                <td>(Soal akan ditambahkan di sini)</td>
              </tr>
              <tr>
                <td>10</td>
                <td>(Soal akan ditambahkan di sini)</td>
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

export default FunctionAndGraphsPage;