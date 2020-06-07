import React, { useContext, useState, useEffect } from "react";
import TokenService from "../../services/token-service";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import BookClubContext from "../../BookClubContext";
import "react-circular-progressbar/dist/styles.css";
import Axios from "axios";
import config from "../../config.js";
import "./DashBar.css";

export default function DashBar(props) {
  const [error, setError] = useState(null);
  const begUser = JSON.parse(TokenService.getUser());
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);

  const { books = [], updateUserProgress } = useContext(BookClubContext);

  const findBook = (books = [], bookId) =>
    books.find((book) => book.id === bookId);

  const book = findBook(books, begUser.following);
  const percentage = Math.floor((page / props.book.pages) * 100);
  const variable = { user: props.user.id, progress: page };

  useEffect(() => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/users/current/${props.user.id}`),
    ])
      .then(([userRes]) => {
        if (!userRes.ok) return userRes.json().then((e) => Promise.reject(e));
        return Promise.all([userRes.json()]);
      })
      .then(([user]) => {
        setUser(user);
        setPage(user.user.progress);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [props.user.id]);

  const handleChange = (e) => {
    setPage(e.target.value);
  };

  const onUpdate = () => setUpdate(!update);

  const updatePage = () => {
    Axios.post(`${config.API_ENDPOINT}/users/update`, variable).then(
      updateUserProgress(page)
    );
    onUpdate();
  };

  if (!user || !book) return <div></div>;

  return (
    <section className="dashbar-container">
      {error ? <div className="red">{error}</div> : null}
      <div className="dash-left">
        <h3 className="dash-banner">Hi, {props.user.username}</h3>
        <div className="progress-report">
          <div className="reading">
            Reading
            <br />
            <div className="progress-title">{book.title}</div>
          </div>
          <div className="current-page">
            Current page
            <div className="progress-title">{page}</div>
          </div>
        </div>
      </div>
      <div className="circle-cont">
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
              textColor: "#212121",
              backgroundColor: "#fffff0",
            })}
            background={true}
          />
        )}
      </div>
      {update ? (
        <div className="page">
          <input
            className="page-input"
            type="number"
            value={page}
            onChange={handleChange}
          />
          <button className="update-send" onClick={updatePage}>
            Send
          </button>
        </div>
      ) : (
        <button className="update-btn" onClick={onUpdate}>
          Update Progress
        </button>
      )}
    </section>
  );
}
