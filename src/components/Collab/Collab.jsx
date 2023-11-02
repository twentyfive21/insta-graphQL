import React from 'react';
import './Collab.css';
import details from '../../assets/dots.png';
import { GET_ALL_USERS } from '../../utils/subscriptions';
import { useSubscription } from '@apollo/client';

function Collab({ userData }) {
  const { data, loading, error } = useSubscription(GET_ALL_USERS, {
    variables: { id: userData.userID },
  });

  if (loading) {
    return <p>Loading...</p>; // Handle loading state
  }
  const userDataItem = data.userData[0];

  return (
    <div className='collab-container'>
      <div className='collab-left'>
        <img src={userDataItem.avatar} className='p-circle' alt='profile pic' />
        <p><span>{userDataItem.username}</span></p>
      </div>
      <img src={details} alt='detail dots' className='dots' />
    </div>
  );
}

export default Collab;
