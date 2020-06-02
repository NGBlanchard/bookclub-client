import React from 'react'
import { NavLink } from "react-router-dom";
import './CommentCard.css'

export default function CommentCard(props) {
  const { comment } = props;
  
  return (
    <NavLink to={`/comment/${comment.id}`} className="comment-shell">
        <li key={props.comment.id} className="comment-card">
          <p className="comment-author">
            {props.comment.author}
            {" • "}
            {props.comment.date_created}
          </p>
          <p className="comment-content">{props.comment.content}</p>
        </li>
    </NavLink>
  )
}
