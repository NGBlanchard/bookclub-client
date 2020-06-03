import React from 'react'
import './Profile.css'

export default function ProfileABout(props) {
  return (
    <section className="profile-about-container">
        {props.description}
      </section>
  )
}
