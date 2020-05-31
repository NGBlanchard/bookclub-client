import React from "react";
import Nav from "../Nav/Nav";
import DashBar from "../DashBar/DashBar";
import Feed from "../Feed/Feed";
import Footer from '../Footer/Footer'
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Nav />
      <div className="dashboard-main">
        <section className="dashboard-grid-container">
          <DashBar />
          <Feed />
          <Footer />
        </section>
      </div>
    </>
  );
}
