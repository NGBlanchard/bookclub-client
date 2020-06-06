import React, { useContext, useState, useEffect } from "react";
import TokenService from "../../services/token-service";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';import BookClubContext from "../../BookClubContext";
import 'react-circular-progressbar/dist/styles.css';
import config from "../../config.js";
import "./DashBar.css";

export default function DashBar(props) {
  
  const [error, setError] = useState(null);
  const begUser = JSON.parse(TokenService.getUser());
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);

  const context = useContext(BookClubContext);

  const findBook = (books = [], bookId) =>
    books.find((book) => book.id === bookId);

  const book = findBook(context.books, begUser.following) || {content: ""};
  
  const percentage = Math.floor((page / book.pages) * 100) || 0;
  
  useEffect(() => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/users/current/${begUser.id}`),
    ])
      .then(([userRes]) => {
        if (!userRes.ok) return userRes.json().then((e) => Promise.reject(e));
        return Promise.all([userRes.json()]);
      })
      .then(([user]) => {
        setUser(user);
        setPage(user.user.progress);
        // setBook(findBook(books, begUser.following[0]));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (!user || !book) return <div></div>;

  return (
    <section className="dashbar-container">
      {error ? <div className="red">{error}</div> : null}
      <div className="reading">
        Reading
        <br />
        <div className="progress-title">{book.title}</div>
      </div>

      <div>
        Current page
        <div className="progress-title">{page}</div>
      </div>
      <div className="profile-circle-cont">
        {!percentage ? (
          <div></div>
        ) : (
          <CircularProgressbar
            text={`${percentage}%`}
            value={percentage}
            strokeWidth={13}
            styles={buildStyles({
              textSize: "25px",
              pathColor: "#CB50FF",
              // trailColor: "#CB50FF",
              textColor: '#212121',
              backgroundColor: "#fffff0",
            })}
            background={true}
          />
        )}
      </div>
    </section>
  );
}
