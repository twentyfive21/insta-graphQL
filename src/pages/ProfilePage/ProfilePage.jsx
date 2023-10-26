import React,{useContext} from 'react'
import './ProfilePage.css'
import basic from '../../assets/nav/basic.png'
import Header from '../../components/Header/Header'
import { CiSettings } from "react-icons/ci";
import { UserContext } from '../../contexts/CurrentUser'
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import { GET_POSTS } from '../../utils/subscriptions';
import { useSubscription, useMutation } from '@apollo/client';
import { ADD_AVATAR } from '../../utils/mutations';

function ProfilePage() {
  const [addAvatar] = useMutation(ADD_AVATAR);
  const {currentUser, setSettings, setCurrentUser} = useContext(UserContext);
  const { data } = useSubscription(GET_POSTS);
 
  const handleAvatar = (e) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    })
  }

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
      alert('success');
    } catch (error) {
      console.error(error);
      alert("Error posting data");
    }
  };

  const handleFormForUpdate = (e) =>{
    //when submitting a form it applies the same as for an input. you need to prevent it from refreshing.
    e.preventDefault();
    addAvatarToDB(currentUser)
  };

  return (
    <div className='main-profile-container'>
    <Header />
        <div className='profile-container'>
        <img src={currentUser.avatar ? currentUser.avatar : basic} 
        alt='profile image' className='profile-image'/>
        <form onSubmit={handleFormForUpdate}>
  <input placeholder='profile image' name='avatar' onChange={handleAvatar} />
  {/* <button type="submit">Submit</button> */}
</form>
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