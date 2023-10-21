import {useContext } from "react";
import './Header.css'
import logo from '../../assets/nav/logo.png'
// import { HiOutlineSearch } from "react-icons/hi"; 
// import home from '../../assets/nav/home.png'
// import comment from '../../assets/nav/comment.png'
// import add from '../../assets/nav/add.png'
// import compass from '../../assets/nav/compass.png'
// import heart from '../../assets/nav/heart.png'
import avatar from '../../assets/nav/avatar.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../contexts/CurrentUser";


function Header() {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  console.log(currentUser, 'from header')

  const viewProfile = () => {
    navigate("/profile-page")
  }
  return (
    <div className='header-main'>
    <img src={logo} alt='instagram logo' className='instagram-logo'/>
    <section>
    {/* <HiOutlineSearch className='search-icon'/>
    <input placeholder='Search' type='text'/> */}
    </section>
    <section className='header-right' onClick={viewProfile}>
        <img src={currentUser.avatar} className='avatar'/>
        <p className='username'>{currentUser.userName}</p>
    </section>
    </div>
  )
}

export default Header