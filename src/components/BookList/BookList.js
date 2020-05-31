import React, { useState, useEffect, useContext } from "react";
import Nav from "../Nav/Nav";
import BookCard from "../BookCard/BookCard";
import Loader from "react-loader-spinner";
import BookClubContext from "../../BookClubContext";
import "./BookList.css";

export default class BookList extends React.Component {
  static contextType = BookClubContext;

  renderBookList = () => {
    const books = this.context.books;
    return books.map((book) => <BookCard key={book.id} book={book} />);
  };
  render() {
  if (!this.context.books) {
    return <Loader />
  }
    return (
      <div className="booklist-container">
        <div className="nav-container">
          <Nav />
        </div>
        <section className="mainbookgrid-container">
          <div className="book-grid-container">
            <section className="grid-container">
              {this.renderBookList()}
            </section>
          </div>
        </section>
      </div>
    );
  }
}
