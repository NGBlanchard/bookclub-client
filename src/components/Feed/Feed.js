import React, { useState } from "react";
import Post from "../Post/Post";

import "./Feed.css";

export default function Feed(props) {
  const following   = props

  return (
    <section className="feed-container">
      {!following ? <h1 className="empty-feed">No posts</h1> : <div>{props.user.id}</div>}
    </section>
  );
}
