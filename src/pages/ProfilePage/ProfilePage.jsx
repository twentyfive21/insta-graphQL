import React,{useContext} from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'
import { CiSettings } from "react-icons/ci";
import { UserContext } from '../../contexts/CurrentUser'
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import { GET_POSTS } from '../../utils/subscriptions';
import { useSubscription } from '@apollo/client';

function ProfilePage() {
  const {currentUser, setSettings} = useContext(UserContext);
  const { data } = useSubscription(GET_POSTS);
  return (
    <div className='main-profile-container'>
    <Header />
        <div className='profile-container'>
        <img src={currentUser.avatar ? currentUser.avatar : basic} alt='profile image' className='profile-image'/>
        <p>{currentUser.username}</p>
        <p>Posts : 0 </p>
        <CiSettings onClick={()=>setSettings(true)} className='user-settings' />
        </div>
        <SettingsModal />
        <section className='user-posts-container'>
        {data?.userPosts?.map(post => <img src={post.image} alt={post.caption} key={post.id}/>)}
        </section>
    </div>
  )
}

export default ProfilePage