import React from 'react'
import './Homepage.css'
import Header from '../components/Header/Header'
import Posts from '../components/Posts/Posts'

function Homepage({userData}) {
  return (
    <div>
    <Header />
    <section className='main-container'>
      <div>
          <div className='all-posts'>
          <Posts item={userData[3].users[0]} index={0}/>
          <Posts item={userData[3].users[1]} index={1}/>
          <Posts item={userData[3].users[2]} index={2}/>
          </div>
      </div>
    </section>
    </div>
  )
}

export default Homepage