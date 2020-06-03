import React from "react";
import Date from "../../services/Date";
import Nav from "../Nav/Nav";
import SubCommentCard from "../Comments/SubCommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";
import Arrow from "../../img/icon_arrow.svg";
import "./CommentPage.css";

export default class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  state = {
    add: false,
    like: false,
  };
  static contextType = BookClubContext;

  goBack() {
    this.props.history.goBack();
  }

  onAdd = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  onLike = () => {
    this.setState({
      like: !this.state.like,
    });
  };

  findComment = (comments = [], commentId) =>
    comments.find((comment) => comment.id === commentId);

  getCommentsForComments = (comments = [], commentId) =>
    !commentId
      ? comments
      : comments.filter((subComment) => subComment.attached_to === commentId);

  render() {
    const { comments = [] } = this.context;
    const { commentId } = this.props.match.params;
    const comment = this.findComment(comments, commentId) || { content: "" };
    const subComments = this.getCommentsForComments(comments, commentId);

    if (!comment) {
      return <div>Loading!!</div>;
    }

    return (
      <>
        <Nav />
        <section className="comment-page-container">
          <button className="comment-back-button" onClick={this.goBack}>
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
              <button
                className="disc-like-button"
                type="button"
                style={{
                  color: !this.state.like
                    ? "lightgray"
                    : "rgba(203, 80, 255, 0.735)",
                }}
                onClick={this.onLike}
              >
                &hearts;
              </button>
              <div
                className="like-text"
                type="button"
                style={{
                  color: !this.state.like
                    ? "#212121"
                    : "rgba(203, 80, 255, 0.735)",
                }}
                onClick={this.onLike}
              >
                Like
              </div>
            </div>
          </div>
          {subComments.length === 0 ? (
            <>
              {this.state.add ? (
                <CommentForm
                  render={subComments}
                  onSubmit={this.onSubmit}
                  onAdd={this.onAdd}
                  attached_to={commentId}
                />
              ) : (
                <div className="button-cont">
                  <Button
                    className="add-button"
                    type="button"
                    onClick={this.onAdd}
                  >
                    Add Comment
                  </Button>
                </div>
              )}
            </>
          ) : (
            <section className="comments-container">
              <ul className="comment-list">
                {subComments.map((comment) => (
                  <SubCommentCard
                    key={comment.id}
                    comment={comment}
                    author={comment.author}
                  />
                ))}
              </ul>
              {this.state.add ? (
                <CommentForm
                  render={subComments}
                  onSubmit={this.onSubmit}
                  onAdd={this.onAdd}
                  attached_to={commentId}
                />
              ) : (
                <div className="button-cont">
                  <Button
                    className="add-button"
                    type="button"
                    onClick={this.onAdd}
                  >
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
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}
