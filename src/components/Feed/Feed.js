import React, { useState } from "react";
import Post from "../Post/Post";

import "./Feed.css";

export default function Feed() {
  const [feed, setFeed] = useState(1);
  return (
    <section className="feed-container">
      {!feed ? <h1 className="empty-feed">No posts</h1> : <div><Post /></div>}
    </section>
  );
}
