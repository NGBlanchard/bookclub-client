import React from 'react'
import './Profile.css'

export default function ProfileHead(props) {
  return (
    <>
      <section className="profilehead-container">
        <div className="profile-img-container">
          <img className="profile-img" src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
          alt="user" />
        </div>
        <div className="profile-info">
          <h3 className="profile-username">{props.user.username}</h3>
          <h4 className="profile-progress">{props.user.progress}</h4>
          <h4 className="profile-website-link">{props.user.website}</h4>
        </div>
        <section className="edit-profile-button">Edit</section>
      </section>
      </>
  )
}
