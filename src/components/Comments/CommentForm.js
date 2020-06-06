import React from "react";
import Close from "../../img/icon_close.svg";
import uuid from "react-uuid";
import "./CommentForm.css";

export default function CommentForm(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    const { content, title } = e.target;
    const comment = {
      id: uuid(),
      content: content.value,
      attached_to: props.attached_to,
      author: props.user.username,
      author_id: props.user.id,
      author_img: props.user.profile_img,
      book: props.bookId,
      title: title.value
    };
    props.onUpdate(comment);
  };

  return (
    <>
      <form className="CommentForm" onSubmit={onSubmit}>
        <button
          className="close-form-button"
          type="button"
          onClick={props.onAdd}
        >
          <img className="close-icon" src={Close} alt="close form" />
          <div className="circle"></div>
        </button>
        {props.title ? (
          <>
          <h4 className="form-label">
          Title of New Discussion:
          </h4>
          <NewTitle
            required
            aria-label="title Box"
            name="title"
            id="title"
            placeholder="Your title..."
          ></NewTitle></>
        ) : (
          <div></div>
        )}
        <div className="content">
          <h4 className="form-label">
          Add new comment:
          </h4>
          <Textarea
            required
            aria-label="Comment Box"
            name="content"
            id="content"
            cols="30"
            rows="3"
            placeholder="Your words..."
          ></Textarea>
        </div>
        <div className="btn-cont">
          <Button type="submit">Submit</Button>
        </div>
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

export function NewTitle({ className, ...props }) {
  return <input className={["NewTitle", className].join(" ")} {...props} />;
}
