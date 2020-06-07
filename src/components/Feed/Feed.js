import React from "react";
import Post from "../Post/Post";

import "./Feed.css";

export default function Feed(props) {
  return (
    <section className="feed-container">
      {!props.posts ? (
        <h1 className="empty-feed">No posts</h1>
      ) : (
        <div>
          {props.posts.reverse().map((post) => (
            <Post key={post.id} post={post} author={post.author} />
          ))}
        </div>
      )}
    </section>
  );
}
