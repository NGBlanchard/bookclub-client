import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicOnlyRoute from "./hocs/PublicOnlyRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import BookList from "./components/BookList/BookList";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile/Profile";
import BookPage from "./components/BookPage/BookPage";
import CommentPage from "./components/CommentPage/CommentPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TokenService from "./services/token-service";
import BookClubContext from "./BookClubContext";
import config from "./config";
import "./App.css";

export default class App extends React.Component {
  state = {
    books: [],
    user: [],
    comments: [],
  };

  setUser = () => {
    const userObj = JSON.parse(TokenService.getUser());
    this.setState({
      user: userObj,
    });
  };

  setComments = (comments) => {
    this.setState({
      comments: comments,
    });
  };

  addComment = (comment) => {
    this.setState(prevState => ({
      comments: [...prevState.comments, comment]
    }));
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/books`),
      fetch(`${config.API_ENDPOINT}/comments`),
    ])
      .then(([booksRes, commentsRes]) => {
        if (!booksRes.ok) return booksRes.json().then((e) => Promise.reject(e));
        if (!commentsRes.ok)
          return commentsRes.json().then((e) => Promise.reject(e));

        return Promise.all([booksRes.json(), commentsRes.json()]);
      })
      .then(([books, comments]) => {
        this.setState({ books, comments });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
    this.setUser();
  }
  render() {
    const contextValue = {
      books: this.state.books,
      getBooks: this.getBooks,
      setBooks: this.setBooks,
      comments: this.state.comments,
      setComments: this.setComments,
      addComment: this.addComment,
      user: this.state.user,
    };
    return (
      <main className="App">
        <BookClubContext.Provider value={contextValue}>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/books" component={BookList} />
            <Route
              path="/book/:bookId"
              render={(routeProps) => {
                return <BookPage {...routeProps} />;
              }}
            />
            <Route
              path="/comment/:commentId"
              render={(routeProps) => {
                return <CommentPage {...routeProps} />;
              }}
            />
            <PrivateRoute path={"/profile"} component={Profile} />
            <PrivateRoute path={"/messages"} component={Messages} />
            <PublicOnlyRoute
              restrictied={false}
              exact
              path={"/login"}
              component={LoginPage}
            />
            <PublicOnlyRoute
              restrictied={true}
              exact
              path={"/register"}
              component={RegistrationPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </BookClubContext.Provider>
      </main>
    );
  }
}
