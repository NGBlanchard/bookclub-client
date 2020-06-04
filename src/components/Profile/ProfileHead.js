import React from 'react'
import DashBar from "../DashBar/DashBar";
import './Profile.css'

export default function ProfileHead(props) {
  return (
    <>
      <section className="profilehead-container">
        <div className="profile-img-container">
          <img className="profile-img" 
          alt="user" src={props.profile_img}/>
        </div>
        <div className="profile-info">
          <h3 className="profile-username">{props.username}</h3>
          <h4 className="profile-website-link">{props.website}</h4>
          <DashBar />
        </div>
      </section>
      </>
  )
}
