import React from 'react'
import Close from "../../img/icon_close.svg";
import './CommentForm.css'

export default function CommentForm(props) {

  const onComment = e => {
   console.log('comment')
  //   e.preventDefault();
  //   const { course } = this.context;
  //   const { content } = e.target;
  //   const comment = {
  //     content: content.value,
  //     date_created: new Date(),
  //     course_id: course.id,
  //     user_id: this.state.user
  //   };
  //   CourseApiService.postComment(comment)
  //     .then(this.context.addComment)
  //     .then(() => {
  //       content.value = "";
  //     })
  //     .catch(this.context.setError);
  }
  
  return (
    <form className="CommentForm" onSubmit={onComment}>
                <button
            className="close-form-button"
            type="button"
            onClick={props.onAdd}
          >
            <img className="close-icon" src={Close} alt="close form" />
</button>
        <div className="content">
          <Textarea
            required
            aria-label="Comment Box"
            name="content"
            id="content"
            cols="30"
            rows="3"
            placeholder="Post a comment..."
          ></Textarea>
        </div>
        <Button type="submit">Submit</Button>
      </form>
  )
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}
export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}

