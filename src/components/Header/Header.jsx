import {useContext } from "react";
import './Header.css'
import logo from '../../assets/nav/logo.png'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();

  return (
    <div className='header-main'>
    <img src={logo} alt='instagram logo' className='instagram-logo' onClick={()=> navigate('/feed')}/>
    </div>
  )
}

export default Header