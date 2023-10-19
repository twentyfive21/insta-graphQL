import React from 'react'
import './Actions.css'
import comment from '../../assets/comment.png'
import heart from '../../assets/lgheart.png'
import send from '../../assets/send.png'
import bookmark from '../../assets/bookmark.png'

function Actions({userData}) {
  return (
    <div>
    <div className='actions-container'>
        <div className='act-spacing'>
        <img src={heart} alt='heart'/>
        <img src={comment} alt='comment'/>
        <img src={send} alt='send'/>
        </div>
        <img src={bookmark} alt='bookmark'/>
    </div>
    <div className='action-data'>
        <div className='action-info'>
        <img src={userData.avatar} alt={userData.username}/>
        <p>Liked by <span>{userData.username}</span> and <span>1,000 others</span></p>
        </div>
        <p className='lighter-info'>3 DAYS AGO</p>
    </div>
    </div>

  )
}

export default Actions