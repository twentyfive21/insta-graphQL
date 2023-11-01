import React from 'react'
import './Actions.css'
import comment from '../../assets/comment.png'
import heart from '../../assets/lgheart.png'
import send from '../../assets/send.png'
import bookmark from '../../assets/bookmark.png'
import smile from '../../assets/smile.png'

function Actions() {
  return (
    <div className='all-actions-main'>
    <div className='actions-container'>
        <div className='act-spacing'>
        <img src={heart} alt='heart'/>
        <img src={comment} alt='comment'/>
        <img src={send} alt='send'/>
        </div>
        <img src={bookmark} alt='bookmark'/>
    </div>
    <div className='action-data'>
        <p>0 likes</p>
        <p className='lighter-info'>3 DAYS AGO</p>
    </div>
    <div className='ac-box'>
        <div className='ac-innerbox'>
        <img src={smile} alt='smile'/>
        <p>Add a comment...</p>
        </div>
        <p className='post'>Post</p>
    </div>
    </div>

  )
}

export default Actions