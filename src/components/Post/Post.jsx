import React from 'react'
import './Post.css'
import Comment from '../Comment/Comment'
import Actions from '../Actions/Actions'
import AddComment from '../AddComment/AddComment'
import leftNav from '../../assets/leftnav.png'
import { userData as oldData } from '../../utils/data'
import Collab from '../Collab/Collab'

function Post({userData}) {
  return (
    <div className='main-box'>
        <section className='next-img'>
        <img src={userData?.image} alt={userData?.userName} className='post-main-image'/>
        {/* <img src={leftNav} className='next-btn' alt='next-btn'/> */}
        </section>
        <section>
        <Collab userData={oldData}/>
        <Comment userData={oldData[0]} />
        <Comment userData={oldData[1]} />
        <Comment userData={oldData[2]} size={{width:'40px', height:'40px'}} />
        <Comment userData={oldData[3]} />
        <Actions userData={oldData[4]} />
        <AddComment />
        </section>
    </div>
  )
}

export default Post