import React,{useContext} from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/CurrentUser'

function ProfilePage() {
  const {currentUser, setUser, setCurrentUser} = useContext(UserContext);
  const  navigate = useNavigate();

  const logoutCurrentUser = () => {
    navigate('/')
    setUser(false)
    setCurrentUser({
      id: '',
      email: '',
      avatar: '',
      username: '',
    })
  }

  return (
    <div>
    <Header />
        <div className='profile-container'>
        <img src={currentUser.avatar ? currentUser.avatar : basic} alt='profile image' className='profile-image'/>
        <p>{currentUser.username}</p>
        <p>Posts : 0 </p>
        <button onClick={logoutCurrentUser}
        className='logout-btn'>Log out</button>
        </div>
    </div>
  )
}

export default ProfilePage