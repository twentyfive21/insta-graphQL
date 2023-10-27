import React from 'react';
import './CommentPage.css';
import Post from '../../components/Post/Post';
import { userData } from '../../utils/data';

function CommentPage() {
  return (
     <div className='main-comment-container'>
    <Post userData={userData}/>
    </div>
  )
}

export default CommentPage