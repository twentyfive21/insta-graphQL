import React, { useState, useContext, useEffect } from 'react';
import './Homepage.css';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import { PiHouseFill } from 'react-icons/pi';
import { LuPlusSquare } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import { GoMoon } from 'react-icons/go';
import { BiSun } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/CurrentUser';
import avatar from '../../assets/login/Default.png';
import Modal from 'react-modal';
import AddPost from '../../components/AddPost/AddPost';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import { GET_POSTS } from '../../utils/subscriptions';
import { useSubscription } from '@apollo/client';
import Spinner from '../../components/Spinner';

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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
};

Modal.setAppElement(document.getElementById('root'));

function Homepage({ userData }) {
   const navigate = useNavigate();
  const { currentUser, setSettings, modalIsOpen, setIsOpen } = useContext(UserContext);
  const [userTheme, setUserTheme] = useState(false);
  const [limit, setLimit] = useState(4);
  const [posts, setPosts] = useState([]);
  const { data, loading } = useSubscription(GET_POSTS, {
    variables: { limit },
  });

  useEffect(() => {
    if (!loading && data && data.userPosts.length > 0) {
      setPosts(data.userPosts);
      // setTimeout(() => {
      //   loadMorePosts();
      // }, 1000);
    }
  }, [loading, data]);

  const loadMorePosts = () => {
    setLimit(prevLimit => prevLimit + 4);
  };

  const viewProfile = () => {
    navigate('/profile-page');
  };

  function changeThemeForUserComfort() {
    setUserTheme(!userTheme);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

    if (loading && posts.length === 0) {
    return <Spinner />; // Show full-page spinner during initial load
  }

  return (
    <div>
      <Header />
      <section className='main-container'>
        <div className='sidebar'>
          <div className='icon-divs' onClick={() => navigate('/feed')}>
            <PiHouseFill /> <h3>Home</h3>
          </div>
          <div className='icon-divs' onClick={openModal}>
            <LuPlusSquare /> <h3>Create</h3>
          </div>
          <div className='icon-divs' onClick={viewProfile}>
            <img src={currentUser.avatar ? currentUser.avatar : avatar} alt='Profile' /> <h3>Profile</h3>{' '}
          </div>
          <div className='icon-divs' onClick={changeThemeForUserComfort}>
            {userTheme ? <BiSun /> : <GoMoon />} <h3>Dark mode</h3>
          </div>
          <div className='icon-divs' onClick={() => setSettings(true)}>
            {' '}
            <CiSettings /> <h3>Settings</h3>
          </div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
            <AddPost />
          </Modal>
          <SettingsModal />
        </div>
           <div className='all-posts'>
          {posts.map(post => (
            <Posts item={post} key={post.id} postId={post.id} />
          ))}
          {/* {loading && posts.length === 0 && <Spinner />} Show spinner during initial load */}
          {/* {!loading && posts.length > 0 && (
            <button className='load-more-button' onClick={loadMorePosts}>
              Load More
            </button>
          )} */}
          {/* {loading && <Spinner />} */}
        </div>
        <div className='follow-sidebar'></div>
      </section>
    </div>
  );
}

export default Homepage;