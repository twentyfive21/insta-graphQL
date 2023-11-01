import React from 'react'
import './Comment.css'
import { AiOutlineHeart } from "react-icons/ai";

function Comment({userData}) {
  return (
    <div className='comment-container'>
      <section className='comment-left'>
      <img src={userData.avatar}  alt={userData.username} />
      <section>
        <p><span className='user-pr'>{userData.username}</span>{userData.comment}</p>
        <div className='actions'>
        <p>{userData.time}</p>
        <p className='bold'>{userData.likes}</p>
        </div>
      </section>
      </section>
      <AiOutlineHeart className='heart-comment'/>
    </div>
  )
}

export default Comment