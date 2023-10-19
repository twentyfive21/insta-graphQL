import React from 'react'
import './Stories.css'

function Stories({item, index}) {

    let storyStyle = {};
    if (index >= 3) {
        storyStyle.color = '#777777'; 
      }

  return (
    <>
        <div className='stories-col'>
        <img src={item.src} alt={item.username}/>
        <p style={storyStyle}>{item.username}</p>
        </div>
    </>
  )
}

export default Stories
