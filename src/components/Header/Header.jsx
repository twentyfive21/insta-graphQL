import {useContext } from "react";
import './Header.css'
import logo from '../../assets/nav/logo.png'
import avatar from '../../assets/login/Default.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../contexts/CurrentUser";


function Header() {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const viewProfile = () => {
    navigate("/profile-page")
  }
  return (
    <div className='header-main'>
    <img src={logo} alt='instagram logo' className='instagram-logo' onClick={()=> navigate('/feed')}/>
    <section>
    {/* <HiOutlineSearch className='search-icon'/>
    <input placeholder='Search' type='text'/> */}
    </section>
    <section className='header-right' onClick={viewProfile}>
        <img src={currentUser.avatar? currentUser.avatar : avatar} className='avatar'/>
        <p className='username'>{currentUser.username}</p>
    </section>
    </div>
  )
}

export default Header