import React from "react";

const BookClubContext = React.createContext({
  books: [],
  setBooks: () => {},
  comments: [],
  setComments: () => {},
  addComment: () => {},
  user: [],
  setUser: () => {},
  updateUserProgress: () => {},
});

export default BookClubContext;