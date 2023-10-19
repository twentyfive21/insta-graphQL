import React from 'react'
import './Follow.css'

function Follow({item, style}) {
  return (
    <div className='follow-section' style={style}>
    <div className='follow-left' >
    <img src={item.src}  alt={item.username}/>
    <div>
    <p className='follow-top'>{item.username}</p>
    <p className='follow-bottom' >{item.following}</p>
    </div>
    </div>
    <p className='blue-text'>{item.status}</p>
    </div>
  )
}

export default Follow