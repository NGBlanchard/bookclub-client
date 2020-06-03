import React, { useState } from 'react'
import './SubCommentCard.css'

export default function CommentCard(props) {
  const [ like, setLike ] = useState(false)
  
  const onLike = () => {
    setLike(!like)
    ///API fetch to update likes
  }
  return (
    <section className="sub-comment-shell">
        <li key={props.comment.id} className="sub-comment-card">
          <p className="sub-comment-author">
            {props.comment.author}
            {" • "}
            {props.comment.date_created}
          </p>
          <p className="sub-comment-content">{props.comment.content}</p>
          <div className="sub-footer-container">
          <div className="sub-feed-stats">
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
          </div>
          <div className="feed-likes-counter"># likes</div>
          </div>
        </li>
    </section>
  )
}
