import React, { Component } from "react";
import Nav from "../Nav/Nav";
import CommentCard from "../Comments/CommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";

import "./BookPage.css";

export default class BookPage extends Component {
  state = {
    add: false,
    book: [],
    comments: [],
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
          {this.state.add ? (
            <CommentForm render={bookComments} onSubmit={this.onSubmit} />
          ) : (
            <button className="add-button" type="button" onClick={this.onAdd}>
              Add Comment
            </button>
          )}
          {bookComments.length === 0 ? (
            <div>No COMMENTS</div>
          ) : (
            <section className="comments-container">
              <h2 className="discussion">Discussion</h2>
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
