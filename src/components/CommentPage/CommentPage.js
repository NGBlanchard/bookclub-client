import React from "react";
import Nav from "../Nav/Nav";
import CommentCard from "../Comments/CommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";
import "./CommentPage.css";

export default class CommentPage extends React.Component {
  state = {
    add: false,
  };
  static contextType = BookClubContext;

  onAdd = () => {
    this.setState({
      add: !this.state.add,
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
          <div className="comment-page-card">
            <p className="comment-author">
              {comment.author}
              {" • "}
              {comment.date_created}
            </p>
            <p className="comment-content">{comment.content}</p>
          </div>
          {subComments.length || !subComments === 0 ? (
            <>
              <h2 className="discussion">No Comments</h2>
              {this.state.add ? (
                <CommentForm
                  render={subComments}
                  onSubmit={this.onSubmit}
                  onAdd={this.onAdd}
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
              <h2 className="comments-header">Comments</h2>
              {this.state.add ? (
                <CommentForm
                  render={subComments}
                  onSubmit={this.onSubmit}
                  onAdd={this.onAdd}
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
              <ul className="comment-list">
                {subComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    author={comment.author}
                  />
                ))}
              </ul>
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
