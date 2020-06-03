import React, { useState } from "react";
import Date from "../../services/Date";
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
        <div className="card-header">
          <div className="comment-img-container">
            <img
              className="card-user-img"
              src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
              alt="user"
            />
          </div>
          <NavLink to={`/comment/${comment.id}`}>
            <div className="comment-post-deets">
              {props.comment.author}
              <br />
              <div className="date">
                <Date date={props.comment.date_created} />
              </div>
            </div>
          </NavLink>
        </div>
        <NavLink to={`/comment/${comment.id}`}>
          <div className="comment-content">{props.comment.content}</div>
        </NavLink>
        <div className="card-footer">
          <div className="likes-cont">
            <div className="disc-feed-stats">
              <button
                className="disc-like-button"
                type="button"
                style={{
                  color: !like ? "lightgray" : "rgba(203, 80, 255, 0.735)",
                }}
                onClick={onLike}
              >
                &hearts;
              </button>
              <div
                className="like-text"
                type="button"
                style={{
                  color: !like ? "#212121" : "rgba(203, 80, 255, 0.735)",
                }}
                onClick={onLike}
              >
                Like
              </div>
            </div>
          </div>
          <div className="comment-cont">
            <NavLink to={`/comment/${comment.id}`} className="card-add-button">
              &#9998; Comment
            </NavLink>
          </div>
        </div>
      </li>
    </div>
  );
}
