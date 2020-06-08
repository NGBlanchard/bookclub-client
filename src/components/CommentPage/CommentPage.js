import React, { useState, useEffect } from "react";
import Date from "../../services/Date";
import Nav from "../Nav/Nav";
import SubCommentCard from "../Comments/SubCommentCard";
import CommentForm from "../Comments/CommentForm";
import Arrow from "../../img/icon_arrow.svg";
import LikeButton from "../LikeButton/LikeButton";
import config from "../../config.js";
import ApiService from "../../services/api-service";
import "./CommentPage.css";

export default function CommentPage(props) {
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState(null);
  const [subComments, setSubComments] = useState(null);

  useEffect(() => {
    const { commentId } = props.match.params;

    Promise.all([fetch(`${config.API_ENDPOINT}/comments`)])
      .then(([commentRes]) => {
        if (!commentRes.ok)
          return commentRes.json().then((e) => Promise.reject(e));
        return Promise.all([commentRes.json()]);
      })
      .then(([comments]) => {
        setComments(comments);
        setComment(findComment(comments, commentId));
        setSubComments(getCommentsForComments(comments, commentId));
      });
  }, [props.match.params]);

  const goBack = () => {
    props.history.goBack();
  };

  const onUpdate = (newComment) => {
    setSubComments([...subComments, newComment]);
    ApiService.postComment(newComment).catch((err) => setError(err));
    onAdd();
  };

  const onAdd = () => {
    setAdd(!add);
  };

  const findComment = (comments = [], commentId) =>
    comments.find((comment) => comment.id === commentId);

  const getCommentsForComments = (comments = [], commentId) =>
    !commentId
      ? comments
      : comments.filter((subComment) => subComment.attached_to === commentId);

  const { commentId } = props.match.params;

  if (!comments || !comment || !subComments) {
    return <div>Loading!!</div>;
  }
  return (
    <>
      <Nav />
      <section className="comment-page-container">
        {error ? <div>error</div> : <div></div>}
        <button className="comment-back-button" onClick={goBack}>
          <img className="comment-back-button" src={Arrow} alt="back arrow" />
        </button>
        <div className="comment-page-card">
          <div className="page-card-header">
            <div className="comment-img-container">
              <img
                className="card-user-img"
                src={comment.author_img}
                alt="user"
              />
            </div>
            <div className="comment-post-deets">
              <div className="title">{comment.title}</div>
              <div className="author-date">
                {comment.author} 
                {" • "}
                <div className="date">
                  <Date className="date" date={comment.date_created} />
                </div>
                
              </div>
            </div>
          </div>
          <p className="comment-page-content">{comment.content}</p>
          <div className="page-feed-stats">
            <LikeButton attached_to={comment.id} />
            <div className="comment-count">
                {subComments.length} comments
                </div>
          </div>
          
        </div>
        {subComments.length === 0 ? (
          <>
            {add ? (
              <CommentForm
                render={subComments}
                onUpdate={onUpdate}
                attached_to={commentId}
                user={props.user}
                bookId={comment.book}
                onAdd={onAdd}
              />
            ) : (
              <div className="button-cont">
                <Button className="add-button" type="button" onClick={onAdd}>
                  Add Comment
                </Button>
              </div>
            )}
          </>
        ) : (
          <section className="comments-container">
            <ul className="comment-list">
              {subComments.reverse().map((comment) => (
                <SubCommentCard
                  key={comment.id}
                  comment={comment}
                  author={comment.author}
                />
              ))}
            </ul>
            {add ? (
              <CommentForm
                render={subComments}
                attached_to={commentId}
                user={props.user}
                bookId={comment.book}
                onUpdate={onUpdate}
                onAdd={onAdd}
              />
            ) : (
              <div className="button-cont">
                <Button className="add-button" type="button" onClick={onAdd}>
                  Add Comment
                </Button>
              </div>
            )}
          </section>
        )}
      </section>
    </>
  );
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}
