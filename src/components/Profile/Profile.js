import React, { useContext } from 'react'
import Nav from "../Nav/Nav";
import Post from "../Post/Post";
import ProfileHead from './ProfileHead.js'
import ProfileAbout from './ProfileAbout.js'

import BookClubContext from '../../BookClubContext.js'
import './Profile.css'

export default function Profile() {
  const context = useContext(BookClubContext)

  const renderGrid = () => {
    const posts = context.user.profileposts
    if (!posts || posts[0].content === "") {
      return <h1 className="empty-feed">No posts</h1>
    } else 
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  
  return (
    <>
      <Nav />
      <div>
        <ProfileHead user={context.user} />
        <div className="upload-form">
          
        </div>
        <ProfileAbout user={context.user} />
        <div className="profile-grid-container">{renderGrid()}</div>
        <Post />
      </div>
    </>
  )
}
