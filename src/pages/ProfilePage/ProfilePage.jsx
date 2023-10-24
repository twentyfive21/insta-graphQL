import React,{useContext, useState} from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/CurrentUser'
import { CiSettings } from "react-icons/ci";
import Modal from 'react-modal'
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";

function ProfilePage() {

  // dark mode state for now until context is created and set for local storage 
  const [darkMode, setDarkMode] = useState(false)

  const {currentUser, setUser, setCurrentUser} = useContext(UserContext);
  const  navigate = useNavigate();

   // create state for modal 
   const [isOpen, setIsOpen] = useState(false)
   // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  // this is for accessibility and screen readers 
   Modal.setAppElement(document.getElementById('root'));
   const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius: '15px',
      transform: 'translate(-50%, -50%)',
    },
    overlay:{
      backgroundColor:'rgba(0,0,0,0.6)'
    }
  };

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
        <CiSettings onClick={()=>setIsOpen(true)} className='user-settings' />
        </div>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          // closes the modal if you click outside the image 
          onRequestClose={()=>setIsOpen(false)}
          contentLabel="Settings Modal">
          <div className='settings-container'>
           <p onClick={()=>setDarkMode(!darkMode)}>
            Dark mode {darkMode? <GoMoon /> : <BiSun /> }
           </p>
           <p onClick={logoutCurrentUser}>Log Out</p>
           <p onClick={()=>setIsOpen(false)}>Cancel</p>
          </div>
      </Modal>
    </div>
  )
}

export default ProfilePage