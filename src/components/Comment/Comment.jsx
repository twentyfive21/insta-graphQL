import React from 'react'
import './Comment.css'
import { AiOutlineHeart } from "react-icons/ai";

function Comment({userData, size}) {
  return (
    <div className='comment-container'>
      <section className='comment-left'>
      <img src={userData.avatar} style={size} alt={userData.username} />
      <section>
        <p><span className='user-pr'>{userData.username}</span>{userData.comment}<span className='hashtag'>{userData.hashtag}</span></p>
        <div className='actions'>
        <p>{userData.time}</p>
        <p className='bold'>{userData.likes}</p>
        <p className='bold'>{userData.reply}</p>
        <p className='bold'>{userData.lang}</p>
        </div>
      </section>
      </section>
      <AiOutlineHeart className='heart-comment'/>
    </div>
  )
}

export default Comment