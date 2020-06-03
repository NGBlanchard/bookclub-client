import React from "react";
import Nav from "../Nav/Nav";
import DashBar from "../DashBar/DashBar";
import Feed from "../Feed/Feed";
import Footer from "../Footer/Footer";
import "./Dashboard.css";

export default function Dashboard(props) {
  const { following } = props.user
  console.log(following)

  const getPostsForFeed = (comments = [], bookId) =>
    !bookId
      ? comments
      : comments.filter((comment) => comment.author_id === bookId);



  return (
    <>
      <Nav />
      <div className="dashboard-main">
        <section className="dashboard-grid-container">
          <DashBar />
          <Feed user={props.user}/>
          <Footer />
        </section>
      </div>
    </>
  );
}
