import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Post from "../Post/Post";
import ProfileHead from "./ProfileHead.js";
import ProfileAbout from "./ProfileAbout.js";
import config from "../../config.js";

import "./Profile.css";

export default function Profile(props) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { userId } = props.match.params;
    Promise.all([fetch(`${config.API_ENDPOINT}/users/current/${userId}`)])
      .then(([userRes]) => {
        if (!userRes.ok) return userRes.json().then((e) => Promise.reject(e));
        return Promise.all([userRes.json()]);
      })
      .then(([user]) => {
        setUser(user.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [props.match.params]);

  const getCommentsForProfile = (comments = [], id) =>
    !id ? comments : comments.filter((comment) => comment.author_id === id);

  const renderGrid = () => {
    const { userId } = props.match.params;
    const comments = props.comments;
    const filteredComments = getCommentsForProfile(comments, userId);
    if (!filteredComments || filteredComments.length === 0) {
      return <h1 className="empty-feed">No posts</h1>;
    } else
      return filteredComments
        .reverse()
        .map((comment) => <Post key={comment.id} post={comment} />);
  };

  if (isLoading) return <div></div>;

  return (
    <>
      <Nav />
      {error ? <div className="red">{error}</div> : null}
      <div>
        <ProfileHead user={user} />
        <ProfileAbout description={user.description} />
        <div className="profile-grid-container">{renderGrid()}</div>
      </div>
    </>
  );
}
