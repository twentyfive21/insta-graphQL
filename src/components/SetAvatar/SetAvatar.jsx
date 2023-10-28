import React,{useContext, useState} from 'react'
import Modal from "react-modal";
import basic from "../../assets/nav/basic.png";
import { useMutation } from '@apollo/client';
import { ADD_AVATAR } from "../../utils/mutations";
import { UserContext } from '../../contexts/CurrentUser';

import './SetAvatar.css'

function SetAvatar() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "24px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  };
  Modal.setAppElement(document.getElementById("root"));
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [addAvatar] = useMutation(ADD_AVATAR);

  const handleAvatar = (e) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const addAvatarToDB = async (user) => {
    try {
      const { id, avatar } = user;
      //add the value of id to check the equal too
      await addAvatar({
        variables: {
          id: id,
          avatar: avatar.length > 0 ? avatar : null,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Error posting data");
    }
  };

  const handleFormForUpdate = (e) => {
    //when submitting a form it applies the same as for an input. you need to prevent it from refreshing.
    e.preventDefault();
    addAvatarToDB(currentUser);
    setAvatar(false)
  };

  const [avatar, setAvatar] = useState(false);
  const handleSettingAvatar = () => {
    setIsOpen(false)
    setAvatar(true)
  }

  return (
    <div>
      <img src={currentUser.avatar ? currentUser.avatar : basic}
          alt="profile image" className="profile-image"
          onClick={()=>setIsOpen(true)}/>
        <Modal
          isOpen={avatar}
          onRequestClose={()=>setAvatar(false)}
          style={customStyles}
          contentLabel="setting avatar input">
           <form onSubmit={handleFormForUpdate} className='avatar-form'>
            <input placeholder="profile image link"
                name="avatar"
                onChange={handleAvatar}/>
            <p onClick={()=>setAvatar(false)}>Cancel</p>
            </form>
        </Modal>
        <Modal
          isOpen={isOpen}
          onRequestClose={()=>setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal">
          <section className='first-avatarModal'>
            <p onClick={handleSettingAvatar}>Change Profile Picture</p>
            <p onClick={()=>setIsOpen(false)}>Cancel</p>
          </section>
        </Modal>
    </div>
  )
}
export default SetAvatar