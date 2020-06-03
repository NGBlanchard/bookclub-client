import React, { useState, useContext } from "react";
import BookClubContext from "../../BookClubContext";
import ApiService from "../../services/api-service";
import Close from "../../img/icon_close.svg";
import uuid from 'react-uuid'
import "./CommentForm.css";

export default function CommentForm(props) {
  const [error, setError] = useState(null);
  const context = useContext(BookClubContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const { content } = e.target;
    const comment = {
      id: uuid(),
      content: content.value,
      attached_to: props.attached_to,
      author: context.user.username,
      author_id: context.user.id,
    };
    ApiService.postComment(comment)
      .then(context.addComment)
      .then(() => {
        content.value = "";
      })
      .catch((err) => setError(err));
  };
  return (
    <>
      {error ? <div>error</div> : <div></div>}
      <form className="CommentForm" onSubmit={onSubmit}>
        <button
          className="close-form-button"
          type="button"
          onClick={props.onAdd}
        >
          <img className="close-icon" src={Close} alt="close form" />
          <div className="circle"></div>
        </button>
        <div className="content">
          <Textarea
            required
            aria-label="Comment Box"
            name="content"
            id="content"
            cols="30"
            rows="3"
            placeholder="Add to the conversation..."
          ></Textarea>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}
export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}
