import React from 'react'
import './Header.css'
import logo from '../../assets/nav/logo.png'
import { HiOutlineSearch } from "react-icons/hi"; 
import home from '../../assets/nav/home.png'
import comment from '../../assets/nav/comment.png'
import add from '../../assets/nav/add.png'
import compass from '../../assets/nav/compass.png'
import heart from '../../assets/nav/heart.png'
import avatar from '../../assets/nav/avatar.png'

function Header() {
  return (
    <div className='header-main'>
    <img src={logo} alt='instagram logo' className='instagram-logo'/>
    <section>
    <HiOutlineSearch className='search-icon'/>
    <input placeholder='Search' type='text'/>
    </section>
    <section className='header-right'>
        <img src={home} />
        <img src={comment} />
        <img src={add} />
         <img src={compass} />
        <img src={heart} />
        <img src={avatar} /> 
    </section>
    </div>
  )
}

export default Header