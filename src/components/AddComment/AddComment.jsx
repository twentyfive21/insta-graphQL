import React from 'react'
import './AddComment.css'
import smile from '../../assets/smile.png'

function AddComment() {
  return (
    <div className='ac-box'>
        <div className='ac-innerbox'>
        <img src={smile} about='smile'/>
        <p>Add a comment...</p>
        </div>
        <p className='post'>Post</p>
    </div>
  )
}

export default AddComment