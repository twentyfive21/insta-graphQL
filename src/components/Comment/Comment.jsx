import React,{useContext} from 'react';
import './Comment.css';
import details from '../../assets/dots.png'
import { UserContext } from '../../contexts/CurrentUser';
import { CommentsContext } from '../../contexts/CommentData';

function Comment({ userData }) {
  const { avatar, comment, username, userID, id, createdAt } = userData;
  const {currentUser} = useContext(UserContext);
  const { deleteCommentfromDB } = useContext(CommentsContext);

  // Convert the createdAt string to a JavaScript Date object
  const createdDate = new Date(createdAt);

  // Calculate the time difference in milliseconds
  const timeDifference = new Date() - createdDate;

  // Calculate the number of days ago
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Define a function to format the time difference
  function formatTimeAgo(days) {
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  }

  const handleDeletedComment = (commentID, postCommentRef) => {
    // deleteCommentfromDB()
    console.log(userData)
  }

  return (
    <div className='comment-container'>
      <section className='comment-left'>
        <img src={avatar} alt={username} />
        <section>
          <p><span className='user-pr'>{username}</span>{comment}</p>
          <div className='actions'>
            <p>{formatTimeAgo(daysAgo)}</p>
            <p className='bold'>{userData.likes}</p>
          </div>
        </section>
      </section>
      {
        userID === currentUser.id && 
        <img src={details}
        onClick={handleDeletedComment}
        className='delete-comment' alt='delete-post'/>
      }
    </div>
  );
}

export default Comment;
