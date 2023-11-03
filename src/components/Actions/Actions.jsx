import {useState, useContext} from 'react'
import './Actions.css'
import comment from '../../assets/comment.png'
import heart from '../../assets/lgheart.png'
import send from '../../assets/send.png'
import bookmark from '../../assets/bookmark.png'
import smile from '../../assets/smile.png'
import { CommentsContext } from '../../contexts/CommentData'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { UserContext } from '../../contexts/CurrentUser'
import { LikesContext } from '../../contexts/LikesContext'

function Actions({postID, userLike, userData}) {
  const {addCommentToDB} = useContext(CommentsContext);
  const {addLikeToDB, removeLikeFromDB} = useContext(LikesContext);
  const [commentValue,setCommentValue] = useState('');
  const {currentUser} = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentToDB(commentValue, postID)
    setCommentValue("")
  }

  console.log(postID, 'postid')

  const finalFilter = userLike.filter((item)=>{
    return item.postRef === postID
  })

  const combinedFinalFilter = [].concat(...finalFilter);

  const findFinal = combinedFinalFilter.filter((item)=>{
    return item.userID === currentUser.id
  })



  console.log(findFinal, 'check')


  return (
    <div className='all-actions-main'>
    <div className='actions-container'>
        <div className='act-spacing'>
            {findFinal[0]?.userID === currentUser.id ? (
              <AiFillHeart onClick={() => removeLikeFromDB(postID)}
              className="like-filled like-btn" />
            ) : (
              <AiOutlineHeart onClick={() => addLikeToDB(postID)}
              className="like-btn" />
            )}
        <img src={comment} alt='comment'/>
        <img src={send} alt='send'/>
        </div>
        <img src={bookmark} alt='bookmark'/>
    </div>
    <div className='action-data'>
      {
      finalFilter.length === 1 ? `${finalFilter.length} like`
      : finalFilter.length > 1 ? `${finalFilter.length} likes`
      : `${finalFilter.length} likes`
      }
        <p className='lighter-info'>3 DAYS AGO</p>
        <p>{userData?.caption}</p>
    </div>
    <div className='ac-box'>
        <div className='ac-innerbox'>
        <img src={smile} alt='smile'/>
        <form onSubmit={handleSubmit}>
            <input
              name="comment"
              placeholder="Add a comment…"
              className="add-comment"
              value={commentValue}
              onChange={(e)=>setCommentValue(e.target.value)}
            />
          </form>
        </div>
        <p className='post'>Post</p>
    </div>
    </div>

  )
}

export default Actions