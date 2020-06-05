import React from 'react'
import { NavLink } from "react-router-dom";
import './BookCard.css'

export default function BookCard(props) {
  const { book } = props;
  
  return (
    <NavLink to={`/book/${book.id}`} className="book-shell">
    <div className="bookcard-container">
      <div className="flipper">
        <span className="front">
          <img className="cover"
            src={
              props.book.cover 
            }
            alt="cover art"
          />
        </span>
        <span className="back">
          <h3 className="title">{props.book.title}</h3>
          <h4 className="pubdate">{props.book.pubdate}</h4>
          <p className="description">{props.book.description}</p>
        </span>
      </div>
    </div>
    </NavLink>

  )
}
