import React from "react";
import Date from "../../services/Date";
import LikeButton from '../LikeButton/LikeButton'
import "./SubCommentCard.css";

export default function CommentCard(props) {

  
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
          <LikeButton attached_to={props.comment.id}/>
        </div>
      </li>
    </section>
  );
}
