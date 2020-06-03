import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./CommentCard.css";

export default function CommentCard(props) {
  const [like, setLike] = useState(false);

  const onLike = () => {
    setLike(!like);
    ///API fetch to update likes
  };
  const { comment } = props;

  return (
    <div className="comment-shell">
      <li key={props.comment.id} className="comment-card">
        <div className="comment-img-container">
          <img
            className="card-user-img"
            src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            alt="user"
          />
        </div>
        <NavLink to={`/comment/${comment.id}`}>
          <p className="comment-author">
            {props.comment.author}
            {" • "}
            {props.comment.date_created}
          </p>
          <div className="comment-content">{props.comment.content}</div>
        </NavLink>
        <div className="sub-footer-container">
          <div className="sub-feed-stats">
            <button
              className="feed-like-button"
              type="button"
              style={{
                color: !like ? "lightgray" : "rgba(203, 80, 255, 0.735)",
              }}
              onClick={onLike}
            >
              &hearts;
            </button>
          </div>
          <div className="feed-likes-counter"># likes</div>
        </div>
      </li>
    </div>
  );
}
