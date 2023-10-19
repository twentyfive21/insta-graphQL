import React from 'react'
import './Suggest.css'
import x from '../../assets/suggest/x.png'

function Suggest({item}) {
  return (
    <div className='suggest-container'>
        <div className='suggest-text'>
        <p>Suggestions for you</p>
        <p>See all</p>
        </div>
        <div className='suggest-users'>
        {
        item.map(user => 
        <div className='suggest-box' key={user.key}>
            <img src={x} className='x' alt='x' />
            <img src={user.src} alt={user.username}/>
            <section>
            <p className='suggest-user'>{user.username}</p>
            <p className='suggest-follow'>{user.following}</p>
            <p className='blue-follow'>Follow</p>
            </section>
        </div>
        )}
        </div>
    </div>
  )
}

export default Suggest