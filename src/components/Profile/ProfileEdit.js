import React, { useState } from "react";
import Close from "../../img/icon_close.svg";
import Axios from "axios";
import config from "../../config.js";
import "./Profile.css";

export default function ProfileEdit(props) {
  const [username, setUsername] = useState(props.user.username);
  const [tagline, setTagline] = useState(props.user.website);
  const [about, setAbout] = useState(props.user.description);
  const [profilePic, setProfilePic] = useState(props.user.profile_img);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };
  const onTaglineChange = (e) => {
    setTagline(e.target.value);
  };

  const onAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const onProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      id: props.user.id,
      username: username,
      website: tagline,
      description: about,
      profile_img: profilePic,
      progress: props.user.progress
    };
    Axios.post(`${config.API_ENDPOINT}/users/profile`, variable);
    props.onEdit();
  };

  return (
    <div className="profile-edit-container">
      <form className="CommentForm" onSubmit={onSubmit}>
        <button
          className="close-form-button"
          type="button"
          onClick={props.onEdit}
        >
          <img className="edit-close-icon" src={Close} alt="close form" />
        </button>

        <h2 className="edit-title">Edit Profile</h2>
        <div className="input-list">
          <input
            type="text"
            placeholder="username"
            className="profile-edit-input"
            label="username"
            onChange={onUsernameChange}
          />
          <input
            type="text"
            placeholder="tagline"
            className="profile-edit-input"
            label="tagline"
            onChange={onTaglineChange}
          />
          <input
            type="textarea"
            placeholder="about"
            className="profile-edit-input"
            label="about"
            onChange={onAboutChange}
          />
          <input
            type="text"
            placeholder="link to profile image"
            className="profile-edit-input"
            label="link to img"
            onChange={onProfilePicChange}
          />
        </div>
        <button type="submit" className="edit-profile-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
