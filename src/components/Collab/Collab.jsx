import React from 'react'
import './Collab.css'
import details from '../../assets/dots.png'


function Collab({userData}) {
  return (
    <div className='collab-container'>
        <div className='collab-left'>
          <img src={userData[4].avatar} className='p-circle' alt='profile pic'/>
          <p><span>{userData[0].username}</span></p>
        </div>
        <img src={details} alt='detail dots' className='dots'/>
    </div>
  )
}

export default Collab