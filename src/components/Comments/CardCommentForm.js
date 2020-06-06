// import React, { useState, useContext } from "react";
// import BookClubContext from "../../BookClubContext";
// import ApiService from "../../services/api-service";
// import Close from "../../img/icon_close.svg";
// import uuid from 'react-uuid'
// import "./CardCommentForm.css";

// export default function CommentForm(props) {
//   const [error, setError] = useState(null);
//   const context = useContext(BookClubContext);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const { content } = e.target;
//     const comment = {
//       id: uuid(),
//       content: content.value,
//       attached_to: props.attached_to,
//       author: context.user.username,
//       author_id: context.user.id,
//     };
//     ApiService.postComment(comment)
//       .then(context.addComment)
//       .then(() => {
//         content.value = "";
//       })
//       .catch((err) => setError(err));
//     props.onAdd()
//   };

//   return (
//     <>
//       {error ? <div>error</div> : <div></div>}
//       <form className="CardCommentForm" onSubmit={onSubmit}>
//         <button
//           className="card-close-form-button"
//           type="button"
//           onClick={props.onAdd}
//         >
//           <img className="card-close-icon" src={Close} alt="close form" />
//         </button>
//         <div className="card-comment-content">
//           <CardTextarea
//             required
//             aria-label="Comment Box"
//             name="content"
//             id="content"
//             cols="30"
//             rows="3"
//             placeholder="Add to the conversation..."
//           ></CardTextarea>
//         </div>
//         <CardButton type="submit">Submit</CardButton>
//       </form>
//     </>
//   );
// }

// export function CardTextarea({ className, ...props }) {
//   return <textarea className={["CardTextarea", className].join(" ")} {...props} />;
// }
// export function CardButton({ className, ...props }) {
//   return <button className={["CardButton", className].join(" ")} {...props} />;
// }
