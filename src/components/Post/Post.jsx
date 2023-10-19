import React from 'react'
import './Post.css'
import Comment from '../Comment/Comment'
import Actions from '../Actions/Actions'
import AddComment from '../AddComment/AddComment'
import leftNav from '../../assets/leftnav.png'

function Post({userData}) {
  return (
    <div className='main-box'>
        <section className='next-img'>
        <img src={userData[0].post} alt={userData[0].username}/>
        <img src={leftNav} className='next-btn' alt='next-btn'/>
        </section>
        <section>
        <Comment userData={userData[0]} />
        <Comment userData={userData[1]} />
        <Comment userData={userData[2]} size={{width:'40px', height:'40px'}} />
        <Comment userData={userData[3]} />
        <Actions userData={userData[4]} />
        <AddComment />
        </section>
    </div>
  )
}

export default Post