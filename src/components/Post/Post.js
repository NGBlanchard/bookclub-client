import React, { useState } from 'react'
import CommentForm from "../Comments/CommentForm";
import Like from "../../img/like.svg";

import './Post.css'

export default function Post(props) {
  const [ comment, setComment ] = useState(null)
  const [ like, setLike ] = useState(false)

  const onComment = () => {
    setComment(!comment);
  };

  const onLike = () => {
    setLike(!like)
  }
  return (
      <section className="post-container">
        <header>
          <a href="TK" className="user" target="_blank">
            <img className="post-avatar" src="TK" alt="TK" />
          </a>
          <span>timestamp</span>
        </header>
        <span className="post-content">Content</span>
        <footer className="post-footer">
          <div className="footer-container">
          <div className="feed-modal-stats">
            <button
              className="feed-like-button"
              type="button"
              style={{
                color: !like
                  ? "lightgray"
                  : "rgba(203, 80, 255, 0.735)",
              }}
              onClick={onLike}
            >
              &hearts;
            </button>
            <button className="feed-comment-button" onClick={onComment}>
              &#9998;
            </button>
          </div>
          <div className="feed-likes-counter"># of Likes</div>
          </div>
          <section className="feed-comment-container">
            {comment ? <CommentForm /> : <div></div>}
            {/* {this.props.comments.length < 1 ? (
            <p>No comments...</p>
          ) : (
        <ul className="modal-comment-list">
              {this.props.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  author={comment.author}
                />
              ))}
            </ul>)} */}
          </section>
        </footer>
      </section>
  )
}
