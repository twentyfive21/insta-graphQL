import './Header.css'
import logo from '../../assets/nav/logo.png'
import { useNavigate } from 'react-router-dom'
import { Squeeze as Hamburger } from 'hamburger-react'

function Header() {
  const navigate = useNavigate();

  return (
    <div className='header-main'>
    <img src={logo} alt='instagram logo' className='instagram-logo' onClick={()=> navigate('/feed')}/>
    <Hamburger />
    </div>
  )
}

export default Header