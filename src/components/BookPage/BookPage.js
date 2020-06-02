import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav/Nav";
import CommentCard from "../Comments/CommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";
import Arrow from "../../img/icon_arrow.svg";
import "./BookPage.css";

export default class BookPage extends Component {
  state = {
    add: false,
  };
  static defaultProps = {
    match: { params: {} },
  };
  static contextType = BookClubContext;

  onAdd = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  onSubmit = () => {};

  findBook = (books = [], bookId) => books.find((book) => book.id === bookId);
  getCommentsForBook = (comments = [], bookId) =>
    !bookId
      ? comments
      : comments.filter((comment) => comment.attached_to === bookId);

  render() {
    const { books = [], comments = [] } = this.context;
    const { bookId } = this.props.match.params;
    const book = this.findBook(books, bookId) || { content: "" };
    const bookComments = this.getCommentsForBook(comments, bookId);

    if (!book) {
      return <div>Loading!!</div>;
    }

    return (
      <>
        <Nav />
        <div className="book-container">
          <header className="header">
            <NavLink className="back-button" to="/books">
              <img className="back-button" src={Arrow} alt="back arrow" />
            </NavLink>
            <section className="head-info">
              <h1 className="book-title">{book.title}</h1>
              <h2 className="author">by {book.author}</h2>
              <h3 className="pubdate">{book.pubdate}</h3>
              <p className="est-time">Estimated Duration: {book.est_time}</p>
            </section>
            <section className="head-img">
              <img
                className="bookpage-cover"
                src={book.cover}
                alt="cover art"
              />
            </section>
          </header>
          {bookComments.length === 0 ? (
            <>
              <h2 className="discussion">No Discussions</h2>
              {this.state.add ? (
                <CommentForm
                  render={bookComments}
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
                    Add Discussion Topic
                  </Button>
                </div>
              )}
            </>
          ) : (
            <section className="comments-container">
              <h2 className="discussion">Discussions</h2>
              {this.state.add ? (
                <CommentForm
                  render={bookComments}
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
                    Add Discussion Topic
                  </Button>
                </div>
              )}
              <ul className="comment-list">
                {bookComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    author={comment.author}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </>
    );
  }
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}
