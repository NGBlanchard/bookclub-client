import React from 'react'
import './CommentCard.css'

export default function CommentCard(props) {
  return (
    <>
        <li key={props.comment.id} className="comment-card">
          <p className="comment-author">
            {props.comment.author}
            {" • "}
            {props.comment.date_created}
          </p>
          <p className="comment-content">{props.comment.content}</p>
        </li>
      </>
  )
}
