import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicOnlyRoute from "./hocs/PublicOnlyRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import BookList from "./components/BookList/BookList";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile/Profile";
import BookPage from "./components/BookPage/BookPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TokenService from "./services/token-service";
import ApiService from "./services/api-service";
import BookClubContext from "./BookClubContext";
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

  getBooks() {
    ApiService.getBooks().then((res) => {
      this.setState({
        books: res,
      });
    });
  }

  componentDidMount() {
    this.setUser();
    this.getBooks();
  }

  render() {
    const contextValue = {
      books: this.state.books,
      getBooks: this.getBooks,
      comments: this.state.comments,
    };
    return (
      <main className="App">
        <BookClubContext.Provider value={contextValue}>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/books" component={BookList} />
            <PrivateRoute path={"/book/:bookId"} component={BookPage} />
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
