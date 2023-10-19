import React from 'react'
import './Collab.css'
import details from '../../assets/dots.png'


function Collab({userData}) {
  return (
    <div className='collab-container'>
        <div className='collab-left'>
        <section>
        <img src={userData[4].avatar} className='p-circle' alt='profile pic'/>
        <img src={userData[0].avatar} className='p-height' alt='profile pic' />
        </section>
        <section className='collab-users'>
            <p><span>{userData[0].username}</span> and <span>{userData[4].username}</span></p>
            <p className='date'>2073</p>
        </section>
        </div>
        <img src={details} alt='detail dots' className='dots'/>
    </div>
  )
}

export default Collab