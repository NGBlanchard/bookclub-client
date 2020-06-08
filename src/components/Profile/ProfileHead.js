import React, { useState } from "react";
import ProfileDash from "../DashBar/ProfileDash";
import ProfileEdit from "./ProfileEdit"
import TokenService from "../../services/token-service";
import "./Profile.css";

export default function ProfileHead(props) {
  const [ edit, setEdit ] = useState(false)
  const currentUser = JSON.parse(TokenService.getUser());

  const onEdit = () => {
    setEdit(!edit);
  };
  return (
    <>
      <section className="profilehead-container">
        {props.user.id === currentUser.id && !edit ? (
          <>
            <button className="profile-edit-button" onClick={onEdit}>
              &#9998;
            </button>
          </>
        ) : (
          <div></div>
        )}
        {edit ? <ProfileEdit onEdit={onEdit} user={props.user}/> : 
        <>
        <div className="profile-img-container">
          <img
            className="profile-img"
            alt="user"
            src={props.user.profile_img}
          />
        </div>
        <div className="profile-info">
          <h3 className="profile-username">{props.user.username}</h3>
          <h4 className="profile-website-link">{props.user.website}</h4>
          <ProfileDash user={props.user} />
        </div>
        </>}
      </section>

    </>
  );
}
