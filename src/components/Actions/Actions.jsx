import {useState, useContext} from 'react'
import './Actions.css'
import comment from '../../assets/comment.png'
import heart from '../../assets/lgheart.png'
import send from '../../assets/send.png'
import bookmark from '../../assets/bookmark.png'
import smile from '../../assets/smile.png'
import { CommentsContext } from '../../contexts/CommentData'

function Actions({postID}) {
  const {addCommentToDB} = useContext(CommentsContext);
  const [commentValue,setCommentValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentToDB(commentValue, postID)
    setCommentValue("")
  }
  return (
    <div className='all-actions-main'>
    <div className='actions-container'>
        <div className='act-spacing'>
        <img src={heart} alt='heart'/>
        <img src={comment} alt='comment'/>
        <img src={send} alt='send'/>
        </div>
        <img src={bookmark} alt='bookmark'/>
    </div>
    <div className='action-data'>
        <p>0 likes</p>
        <p className='lighter-info'>3 DAYS AGO</p>
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