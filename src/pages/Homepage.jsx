import React from 'react'
import './Homepage.css'
import Header from '../components/Header/Header'
import Follow from '../components/Follow/Follow'
import Stories from '../components/Stories/Stories'
import next from '../assets/posts/next.png'
import Suggest from '../components/Suggest/Suggest'
import Posts from '../components/Posts/Posts'

function Homepage({userData}) {
  return (
    <div>
    <Header />
    <section className='main-container'>
      <div>
          {/* <div className='stories-container'>
          {
            userData[1].users.map((item, index) => <Stories item={item} index={index} key={item.key}/>)
          }
          <img className='stories-nextbtn' src={next} alt='next-btn'/>
          </div> */}
          <div className='all-posts'>
          <Posts item={userData[3].users[0]} index={0}/>
          <Posts item={userData[3].users[1]} index={1}/>
          {/* <Suggest item={userData[2].users}/> */}
          <Posts item={userData[3].users[2]} index={2}/>
          </div>
      </div>
      {/* <div className='follow-right'>
          <Follow item={userData[0].users[0]} style={{backgroundColor: '#F5F5F5'}}   />
      </div> */}
    </section>
    </div>
  )
}

export default Homepage