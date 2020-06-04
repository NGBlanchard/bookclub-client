import React from "react";
import Nav from "../Nav/Nav";
import DashBar from "../DashBar/DashBar";
import Feed from "../Feed/Feed";
import Footer from "../Footer/Footer";
import "./Dashboard.css";

export default function Dashboard(props) {
  
  const { following } = props.user;
  const feedPosts = props.comments.filter(comment => comment.book === following[0])
  
  return (
    <>
      <Nav />
      <div className="dashboard-main">
        <section className="dashboard-grid-container">
          <DashBar />
          <Feed user={props.user} posts={feedPosts}/>
          <Footer />
        </section>
      </div>
    </>
  );
}
