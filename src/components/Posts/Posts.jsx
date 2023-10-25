import {React, useState} from 'react'
import './Posts.css'
import dotDark from '../../assets/posts/dotDark.png'
import { AiOutlineHeart, AiFillHeart} from "react-icons/ai";  
import comment from '../../assets/posts/comment.png'
import smile from '../../assets/posts/smile.png'
import blueCheck from '../../assets/posts/blue.png'

function Posts({item}) {
    
    const [like, setLike] = useState(false)
    const [comments, setComments] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        const newComment = e.target.elements.comment.value;
        setComments(prev => [...prev, newComment]);
    }
  return (
    <div className='single-insta-post'>
        <div className='username-insta-section'>
        <div className='user-insta-left'>
            <img src={item.postAvatar} alt={item.postUsername} />
            <p>{item.postUsername}</p>
        </div>
        <img src={dotDark} alt='dots'/>
        </div>
        <div className='user-insta-img'>
            <img src={item.image} alt={item.caption}/>
        </div>
        <div className='interact-insta-section'>
            <div className='interact-insta-left'>
           <button onClick={()=>setLike(!like)}>
            {
            like ? <AiFillHeart className='like-filled like-btn'/> : <AiOutlineHeart className='like-btn'/> 
            }
            </button> 
            <button><img src={comment} /></button>
            </div>
        </div>
        <div className='comment-insta-container'>
            <p className='comment-insta-likes'>{item.likes} likes</p>
            <p className='caption-insta'>{item.postUsername} <span>{item.caption}</span></p>
            <p className='comment-count-insta'>View all 13,384 comments</p>
            {
                comments.map(comment => 
                <p key={comment} className='added-comment-insta'>
                <span className='comment-user'>tinawinnn :</span>
                <span className='comment-text'>{comment}</span>
                </p>)
            }
            <div className='comment-section-insta'>
                <form onSubmit={handleSubmit}>
                <input name="comment" placeholder='Add a comment…' className='add-comment' />
                </form>
                <img src={smile} alt='smile'/>
            </div>
        </div>
    </div>
  )
}

export default Posts