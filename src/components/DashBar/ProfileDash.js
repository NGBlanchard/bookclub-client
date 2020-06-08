import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';import BookClubContext from "../../BookClubContext";
import 'react-circular-progressbar/dist/styles.css';
import "./DashBar.css";

export default function DashBar(props) {

  const context = useContext(BookClubContext);

  const findBook = (books = [], bookId) =>
    books.find((book) => book.id === bookId);

  const book = findBook(context.books, props.user.following) || {content: ""};
  
  const percentage = Math.floor((props.user.progress / book.pages) * 100) || 0;
  
  if (!props.user || !book) return <div></div>;

  return (
    <section className="profile-dashbar-container">
      <div className="reading">
        Reading
        <br />
        <div className="progress-title">{book.title}</div>
      </div>

      <div>
        Current page
        <div className="progress-title">{props.user.progress}</div>
      </div>
      <div className="profile-circle-cont">
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
              textColor: '#212121',
              backgroundColor: "#fffff0",
            })}
            background={true}
          />
        )}
      </div>
    </section>
  );
}
