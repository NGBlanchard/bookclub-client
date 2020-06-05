import React from "react";
import Date from "../../services/Date";
import LikeButton from '../LikeButton/LikeButton'
import "./Post.css";

export default function Post(props) {

  return (
    <section className="post-container">
      <header>
        <div className="subcomment-img-container">
          <img
            className="subcard-user-img"
            src={props.post.author_img}
            alt="user"
          />
        </div>
        <div className="sub-comment-author">
          {props.post.author}
          {" • "}
          <div className="subdate">
            <Date date={props.post.date_created} />
          </div>
        </div>
      </header>
      <p className="sub-comment-content">{props.post.content}</p>
      <div className="subpage-feed-stats">
        <LikeButton attached_to={props.post.id}/>
      </div>
    </section>
  );
}
