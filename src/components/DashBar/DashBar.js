import React, { useContext, useState, useEffect } from "react";
import TokenService from "../../services/token-service";
import { CircleProgress } from "react-gradient-progress";
import BookClubContext from "../../BookClubContext";
import Axios from "axios";
import config from "../../config.js";
import "./DashBar.css";

export default function DashBar(props) {
  const [ error, setError ] = useState(null)
  const begUser = JSON.parse(TokenService.getUser());
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null)

  const { books = [], updateUserProgress } = useContext(BookClubContext);

  const findBook = (books = [], bookId) =>
    books.find((book) => book.id === bookId);
  
  const book = findBook(books, begUser.following[0]) || { content: "" };
  const percentage = Math.floor((page / book.pages) * 100);
  const variable = { user: begUser.id, progress: page };
  

  useEffect(() => {
    Promise.all([fetch(`${config.API_ENDPOINT}/users/current/${begUser.id}`)
    ]).then(([userRes]) => {
      if (!userRes.ok) return userRes.json().then((e) => Promise.reject(e))
    return Promise.all([userRes.json()]);
  })
  .then(([user]) => {
    setUser(user);
    setPage(user.user.progress)
  })
  .catch((err) => {
    setError(err.message);
  });
}, [begUser.id])
  
  const handleChange = (e) => {
    setPage(e.target.value);
  };

  const onUpdate = () => setUpdate(!update);

  const updatePage = () => {
    Axios.post(`${config.API_ENDPOINT}/users/update`, variable)
    .then(updateUserProgress(page))
    onUpdate()
  };

  if(!user) return <div></div>

  return (
    <section className="dashbar-container">
      <div className="reading">
        Reading
        <br />
        <div className="progress-title">{book.title}</div>
      </div>
      
        <div>
          Current page 
          <div className="progress-title">{page}</div>
        </div>
        <div className="circle-cont">
        {!percentage ? (<div></div>) : (
        <CircleProgress
          width={50}
          percentage={percentage}
          strokeWidth={4}
          primaryColor={["#CB50FF", "#EBEBEB"]}
          fontSize={"13px"}
        />)}
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
