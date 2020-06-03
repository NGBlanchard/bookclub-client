import React from 'react'
import Nav from "../Nav/Nav";
import Post from "../Post/Post";
import ProfileHead from './ProfileHead.js'
import ProfileAbout from './ProfileAbout.js'
import './Profile.css'

export default function Profile(props) {
  const { id, profile_img, username, progress, website, description } = JSON.parse(props.user)
 
  const getCommentsForProfile = (comments = [], id) =>
    !id
      ? comments
      : comments.filter((comment) => comment.author_id === id);

  const renderGrid = () => {
    const comments = props.comments
    const filteredComments = getCommentsForProfile(comments, id)
    if (!filteredComments || filteredComments.length === 0) {
      return <h1 className="empty-feed">No posts</h1>
    } else 
    return filteredComments.map((comment) => <Post key={comment.id} post={comment} />);
  };

  if (!props.user) {
    return <div>Loading Profile</div>
  }
  return (
    <>
      <Nav />
      <div>
        <ProfileHead username={username} progress={progress} website={website} profile_img={profile_img}/>
        <div className="upload-form">
          
        </div>
        <ProfileAbout description={description} />
        <div className="profile-grid-container">{renderGrid()}</div>
      </div>
    </>
  )
}
