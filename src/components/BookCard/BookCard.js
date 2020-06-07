import React from "react";
import { NavLink } from "react-router-dom";
// import Axios from "axios";
// import TokenService from "../../services/token-service";
// import config from "../../config.js";
import "./BookCard.css";

export default function BookCard(props) {
  // const user = JSON.parse(TokenService.getUser());
  const { book } = props;

  // const variable = { user: user.id, following: book.id };

  // const updateFollowing = async (e) => {
  //   console.log(variable)
  //   Axios.post(`${config.API_ENDPOINT}/users/following`, variable)
  //   .then(res => console.log(res));
  // };

  return (
    <NavLink to={`/book/${book.id}`} className="book-shell">
      <div className="bookcard-container">
        <div className="flipper">
          <span className="front">
            <img className="cover" src={book.cover} alt="cover art" />
          </span>
          <span className="back">
            <h3 className="title">{book.title}</h3>
            {/* <button className="reading-btn" onClick={updateFollowing}>Reading?</button> */}
            <h4 className="pubdate">{book.pubdate}</h4>
            <p className="description">{book.description}</p>
          </span>
        </div>
      </div>
    </NavLink>
  );
}
