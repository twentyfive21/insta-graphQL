import React,{useContext} from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'
import { CiSettings } from "react-icons/ci";
import { UserContext } from '../../contexts/CurrentUser'
import SettingsModal from '../../components/SettingsModal/SettingsModal';

function ProfilePage() {
  const {currentUser, setSettings} = useContext(UserContext);
  return (
    <div>
    <Header />
        <div className='profile-container'>
        <img src={currentUser.avatar ? currentUser.avatar : basic} alt='profile image' className='profile-image'/>
        <p>{currentUser.username}</p>
        <p>Posts : 0 </p>
        <CiSettings onClick={()=>setSettings(true)} className='user-settings' />
        </div>
        <SettingsModal />
    </div>
  )
}

export default ProfilePage