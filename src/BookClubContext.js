import React from "react";

const BookClubContext = React.createContext({
  books: [],
  setBooks: () => {},
  comments: [],
  setComments: () => {},
  addComment: () => {},
  user: [],
  setUser: () => {},
});

export default BookClubContext;