import React, { useContext } from "react";
import Nav from "../Nav/Nav";
import BookCard from "../BookCard/BookCard";
import Loader from "react-loader-spinner";
import BookClubContext from "../../BookClubContext";
import "./BookList.css";

const BookList = () => {
  const context = useContext(BookClubContext);
  
  const renderBookList = () => {
    return context.books.map((book) => <BookCard key={book.id} book={book} />);
  };

  if (!context.books) {
    return <Loader />;
  }
  return (
    <div className="booklist-container">
      <div className="nav-container">
        <Nav />
      </div>
      <section className="mainbookgrid-container">
        <div className="book-grid-container">
          <section className="grid-container">{renderBookList()}</section>
        </div>
      </section>
    </div>
  );
};

export default BookList;
