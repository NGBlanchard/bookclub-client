import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav/Nav";
import CommentCard from "../Comments/CommentCard";
import CommentForm from "../Comments/CommentForm";
import BookClubContext from "../../BookClubContext";
import ApiService from "../../services/api-service";
import Arrow from "../../img/icon_arrow.svg";
import "./BookPage.css";

export default class BookPage extends Component {
  state = {
    add: false,
    book: [],
    bookComments: [],
  };
  static defaultProps = {
    match: { params: {} },
  };
  static contextType = BookClubContext;

  // componentDidMount() {
  //   const { books = [], comments = [] } = this.context;
  //   const { bookId } = this.props.match.params;
  //   const book = this.findBook(books, bookId) || { content: "" };
  //   this.setState({
  //     book: book,
  //   });
  //   const bookComments = this.getCommentsForBook(comments, bookId);
  //   this.setState({
  //     bookComments: bookComments,
  //   });
  // }

  addComment = comment => {
    this.setState(prevState => ({
      comments: [...prevState.comments, comment]
    }));
  };

  onUpdate = (newComment) => {
    ApiService.postComment(newComment)
    this.context.addComment(newComment)
    this.onAdd();
  };

  onAdd = () => {
    this.setState({
      add: !this.state.add,
    });
  };

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
    const user = JSON.parse(this.props.user);

    if (!user || !book) {
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
                  onAdd={this.onAdd}
                  attached_to={bookId}
                  bookId={bookId}
                  title={true}
                  user={user}
                  onUpdate={this.onUpdate}
                />
              ) : (
                <div className="button-cont">
                  <Button
                    className="add-button"
                    type="button"
                    onClick={this.onAdd}
                  >
                    <div className="profile-img-container">
                      <img
                        className="user-img"
                        src={user.profile_img}
                        alt="user"
                      />
                    </div>
                    <p className="add-text">Add discussion topic...</p>
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
                  onAdd={this.onAdd}
                  attached_to={bookId}
                  bookId={bookId}
                  title={true}
                  user={user}
                  onUpdate={this.onUpdate}
                />
              ) : (
                <div className="button-cont">
                  <Button
                    className="add-button"
                    type="button"
                    onClick={this.onAdd}
                  >
                    <div className="profile-img-container">
                      <img
                        className="user-img"
                        src={user.profile_img}
                        alt="user"
                      />
                    </div>
                    <p className="add-text">Add discussion topic...</p>
                  </Button>
                </div>
              )}
              <ul className="comment-list">
                {bookComments.reverse().map((comment) => (
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
  return <button className="add-disc-btn" {...props} />;
}
