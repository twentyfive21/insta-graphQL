import React, {useState, useContext} from 'react'
import './Homepage.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci"
import { GoMoon } from "react-icons/go"
import { BiSun } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/CurrentUser';
import avatar from '../../assets/login/Default.png'
import Modal from 'react-modal';
import AddPost from '../../components/AddPost/AddPost';

 const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '24px',
    },
    overlay:{
      backgroundColor: "rgba(0,0,0,0.6)"
    }
  };


    Modal.setAppElement(document.getElementById('root'));





function Homepage({userData}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [userTheme, setUserTheme] = useState(false);
  function changeThemeForUserComfort (){
    setUserTheme(!userTheme);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
    <Header />
    <section className='main-container'>
      <div className='sidebar'>
        <div className='icon-divs'><PiHouseFill /> <h3 onClick={()=>navigate('/feed')}>Home</h3></div>
         <div className='icon-divs'><LuPlusSquare/> <h3 onClick={openModal}>Create</h3>
        </div>
         <div className='icon-divs'><img src={currentUser.avatar? currentUser.avatar : avatar}/> <h3  onClick={()=>navigate('/profile-page')}>Profile</h3> </div>
        <div className='icon-divs'>{userTheme? <BiSun /> :<GoMoon />} <h3 onClick={changeThemeForUserComfort}>Dark mode</h3></div>
        <div className='icon-divs'><CiSettings /> <h3>Settings</h3></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       <AddPost />
      </Modal>
      </div>
          <div className='all-posts'>
          <Posts item={userData[3].users[0]} index={0}/>
          <Posts item={userData[3].users[1]} index={1}/>
          <Posts item={userData[3].users[2]} index={2}/>
          </div>
       <div className='follow-sidebar'>

      </div>
    </section>
    </div>
  )
}

export default Homepage