import React, { useContext } from "react";
import Nav from "../Nav/Nav";
import DashBar from "../DashBar/DashBar";
import Feed from "../Feed/Feed";
import Footer from "../Footer/Footer";
import BookClubContext from "../../BookClubContext";
import "./Dashboard.css";

export default function Dashboard(props) {

  const { books = [],  } = useContext(BookClubContext);


  const findBook = (books = [], bookId) =>
    books.find((book) => book.id === bookId);

  const book = findBook(books, props.user.following) || { content: "" };

  
  const { following } = props.user;
  const feedPosts = props.comments.filter(comment => comment.book === following)

  return (
    <>
      <Nav />
      <div className="dashboard-main">
        <section className="dashboard-grid-container">
          <DashBar book={book} user={props.user}/>
          <div className="recent-posts">
            <div className="pointer">&#9759;</div> 
            {feedPosts.length} Recent Posts 
            <div className="pointer">&#9759;</div> 
          </div>
          <Feed user={props.user} posts={feedPosts}/>
          <Footer />
        </section>
      </div>
    </>
  );
}
