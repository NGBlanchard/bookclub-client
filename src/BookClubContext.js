import React from "react";

const BookClubContext = React.createContext({
  books: [],
  setBooks: () => {},
  comments: [],
  setComments: () => {},
  user: [],
  setUser: () => {},
});

export default BookClubContext;