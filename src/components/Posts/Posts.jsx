import { React, useState, useContext } from "react";
import "./Posts.css";
import dotDark from "../../assets/posts/dotDark.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import comment from "../../assets/posts/comment.png";
import smile from "../../assets/posts/smile.png";
import blueCheck from "../../assets/posts/blue.png";
import { GET_ALL_USERS } from "../../utils/subscriptions";
import { useSubscription, useMutation } from "@apollo/client";
import Avatar from "../../assets/login/Default.png"
import { UserContext } from "../../contexts/CurrentUser";
import { DELETE_POST } from "../../utils/mutations";
import Modal from 'react-modal'
import { GET_COMMENTS } from "../../utils/subscriptions";


function Posts({ item }) {

  Modal.setAppElement(document.getElementById('root'));
  const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     borderRadius: '15px',
     transform: 'translate(-50%, -50%)',
   },
   overlay:{
     backgroundColor:'rgba(0,0,0,0.1)'
   }
 };

  const {currentUser, isDeleteOpen, setIsDeleteOpen, deletedPost, setDeletedPost} = useContext(UserContext);
  const [deletePost] = useMutation(DELETE_POST);

  const { data } = useSubscription(GET_ALL_USERS, {
    variables: { id: item.userID },
  });



  //comments

  const { data: commentData } = useSubscription(GET_COMMENTS);
  console.log(commentData)





  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = e.target.elements.comment.value;
    setComments((prev) => [...prev, newComment]);
  };

  const deletePostFromDB = async () => {
    try {
      const { id, userID } = deletedPost; 
      //add the value of id to check the equal too
      await deletePost({
        variables: {
          id: id,
          userID: userID.length > 0 ? userID : null,
        },
      });
    } catch (error) {
      console.log("Error deleting post");
    }
    setIsDeleteOpen(false)
  }

  const deletePostSelected = (post) => {
    setDeletedPost(post)
    setIsDeleteOpen(true)
}

  return (
    <div className="single-insta-post" id={item.userID} >
      <div className="username-insta-section">
        <div className="user-insta-left">
          <img src={data?.userData[0]?.avatar ? data?.userData[0]?.avatar :Avatar} alt={data?.userData[0]?.avatar} />
          <p>{data?.userData[0]?.username}</p>
        </div>
        {
        currentUser.id === item.userID && 
        <img src={dotDark} alt="dots" onClick={()=>deletePostSelected(item)} 
        className="post-delete-btn"/>
        }
        <Modal 
          isOpen={isDeleteOpen}
          style={customStyles}
          // closes the modal if you click outside the image 
          onRequestClose={()=>setIsDeleteOpen(false)}
          contentLabel="Delete Post Modal">
          <div className='delete-post-modal'>
            <p className='delete-post-btn' onClick={deletePostFromDB}>Delete</p>
            <p onClick={()=> setIsDeleteOpen(false)}>Cancel</p>
          </div>
      </Modal>
      </div>
      <div className="user-insta-img">
        <img src={item.image} alt={item.caption} />
      </div>
      <div className="interact-insta-section">
        <div className="interact-insta-left">
          <button onClick={() => setLike(!like)}>
            {like ? (
              <AiFillHeart className="like-filled like-btn" />
            ) : (
              <AiOutlineHeart className="like-btn" />
            )}
          </button>
          <button>
            <img src={comment} />
          </button>
        </div>
      </div>
      <div className="comment-insta-container">
        <p className="comment-insta-likes">{item.likes} likes</p>
        <p className="caption-insta">
         {data?.userData[0]?.username} <span>{item.caption}</span>
        </p>
        <p className="comment-count-insta">View all 13,384 comments</p>
        {comments.map((comment) => (
          <p key={comment} className="added-comment-insta">
            <span className="comment-user">tinawinnn :</span>
            <span className="comment-text">{comment}</span>
          </p>
        ))}
        <div className="comment-section-insta">
          <form onSubmit={handleSubmit}>
            <input
              name="comment"
              placeholder="Add a comment…"
              className="add-comment"
            />
          </form>
          <img src={smile} alt="smile" />
   
        </div>
      </div>
    </div>
  );
}

export default Posts;
