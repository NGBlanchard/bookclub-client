import React from "react";
import Date from "../../services/Date";
import { NavLink } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import "./CommentCard.css";

export default function CommentCard(props) {
  const { comment } = props;

  return (
    <div className="comment-shell">
      <li key={props.comment.id} className="comment-card">
        <div className="card-header">
          <div className="comment-img-container">
            <img
              className="card-user-img"
              src={props.comment.author_img}
              alt="user"
            />
          </div>
          <NavLink to={`/comment/${comment.id}`}>
            <div className="comment-post-deets">
              <div className="title">{props.comment.title}</div>
              <br />
              <div className="author-date">
                {props.comment.author}
                {" • "}
                <div className="date">
                  <Date date={props.comment.date_created} />
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <NavLink to={`/comment/${comment.id}`}>
          <br />
          <div className="comment-content">{props.comment.content}</div>
        </NavLink>
        <div className="card-footer">
          <div className="likes-cont">
            <LikeButton attached_to={comment.id} />
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
