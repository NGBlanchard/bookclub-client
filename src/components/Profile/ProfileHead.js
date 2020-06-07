import React from 'react'
import ProfileDash from "../DashBar/ProfileDash";
import './Profile.css'

export default function ProfileHead(props) {

  return (
    <>
      <section className="profilehead-container">
        <div className="profile-img-container">
          <img className="profile-img" 
          alt="user" src={props.user.profile_img}/>
        </div>
        <div className="profile-info">
          <h3 className="profile-username">{props.user.username}</h3>
          <h4 className="profile-website-link">{props.user.website}</h4>
          <ProfileDash user={props.user}/>
        </div>
      </section>
      </>
  )
}
