import React, { useState } from "react";
import Date from "../../services/Date";
import "./SubCommentCard.css";

export default function CommentCard(props) {
  const [like, setLike] = useState(false);

  const onLike = () => {
    setLike(!like);
    ///API fetch to update likes
  };
  return (
    <section className="sub-comment-shell">
      <li key={props.comment.id} className="subcomment-card">
        <div className="subcomment-img-container">
          <img
            className="subcard-user-img"
            src={props.comment.author_img}
            alt="user"
          />
        </div>
        <div className="sub-comment-author">
          {props.comment.author}
          {" • "}
          <div className="subdate">
            <Date date={props.comment.date_created} />
          </div>
        </div>
        <p className="sub-comment-content">{props.comment.content}</p>
        <div className="subpage-feed-stats">
          <button
            className="subdisc-like-button"
            type="button"
            style={{
              color: !like ? "lightgray" : "rgba(203, 80, 255, 0.735)",
            }}
            onClick={onLike}
          >
            &hearts;
          </button>
          <div
            className="sublike-text"
            type="button"
            style={{
              color: !like ? "#212121" : "rgba(203, 80, 255, 0.735)",
            }}
            onClick={onLike}
          >
            Like
          </div>
        </div>
      </li>
    </section>
  );
}
