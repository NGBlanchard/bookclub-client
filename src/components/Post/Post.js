import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Date from "../../services/Date";
import LikeButton from "../LikeButton/LikeButton";
import "./Post.css";

export default function Post(props) {
  const [endpoint, setEndpoint] = useState("comment");
  const { attached_to } = props.post;

  useEffect(() => {
    if (props.post.title) {
      setEndpoint("book");
    }
  }, [props.post.title]);
  return (
    <section className="post-container">
      <header>
        <NavLink to={`/profile/${props.post.author_id}`}>
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
        </NavLink>
      </header>
      <p className="sub-comment-content">
        {" "}
        {props.post.title ? (
          <>
            <div className="post-detail">
              New Discussion:{" "}
              <div className="post-title-title">{props.post.title}</div>
            </div>
          </>
        ) : null}
        <div className="post-content">{props.post.content}</div>
      </p>
      <div className="post-footer">
        <div className="subpage-feed-stats">
          <LikeButton attached_to={props.post.id} />
        </div>
        <NavLink to={`/${endpoint}/${attached_to}`} className="to-discussion">
          Go to Discussion
          <div className="go">&#x2192;</div>
        </NavLink>
      </div>
    </section>
  );
}
