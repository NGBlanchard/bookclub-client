import React from "react";

const BookClubContext = React.createContext({
  books: [],
  user: [],
  comments: [],
  setUser: () => {},
  setBookList: () => {},
});

export default BookClubContext;