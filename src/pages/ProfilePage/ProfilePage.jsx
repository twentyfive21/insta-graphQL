import React from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'

function ProfilePage() {
  return (
    <div>
    <Header />
        <div className='profile-container'>
        <img src={basic} alt='profile image' className='profile-image'/>
        <p>tina.nguyen</p>
        <p>Posts : 0 </p>
        <p>Email : fake@gmail.com</p>
        <p>Date Created : Oct 5 2023</p>
        <button>Log out</button>
        </div>
    </div>
  )
}

export default ProfilePage