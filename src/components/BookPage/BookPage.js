import React, { Component } from "react";
import Nav from "../Nav/Nav";
// import CommentCard from "../Comments/CommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";

import "./BookPage.css";

export default class BookPage extends Component {
  state = {
    book: [],
    comments: [],
  };
  static defaultProps = {
    match: { params: {} },
  };
  static contextType = BookClubContext;

  componentDidMount() {
    this.setBook();
  }

  setBook = () => {
    const { books } = this.context;
    const { bookId } = this.props.match.params;
    const findBook = books.find(
      (book) => parseInt(book.id) === parseInt(bookId)
    );
    this.setState({
      book: findBook,
    });
    this.setComments(parseInt(bookId))
  };

  setComments = (id) => {
    const { comments } = this.context
    const filterComments = comments.filter(
      (comment) => parseInt(comment.target) === id)
    this.setState({
      comments: filterComments,
    });
    
  };


  render() {
    const { comments } = this.state
    if (!this.state.book) {
      return (
      <div>Loading!!</div>
    )}
    return (
      <>
        <Nav />
        <div className="book-container">
          <header className="header">
            <section className="head-info">
              <h1 className="book-title">{this.state.book.title}</h1>
              <h2 className="author">by {this.state.book.author}</h2>
              <h3 className="pubdate">{this.state.book.pubdate}</h3>
              <p className="est-time">
                Estimated Duration: {this.state.book.est_time}
              </p>
            </section>
            <section className="head-img">
              <img
                className="bookpage-cover"
                src={this.state.book.cover}
                alt="cover art"
              />
            </section>
          </header>
          {/* <section className="comments-container">
            <h2 className="discussion">Discussion</h2>
            <ul className="comment-list">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  author={comment.author}
                />
              ))}
            </ul>
          </section> */}
          <CommentForm render={this.state.comments} />
        </div>
      </>
    );
  }
}
