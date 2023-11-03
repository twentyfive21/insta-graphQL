import { React, useState, useContext } from "react";
import "./Posts.css";
import dotDark from "../../assets/posts/dotDark.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import commentIMG from "../../assets/posts/comment.png";
import smile from "../../assets/posts/smile.png";
import { GET_ALL_USERS } from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";
import Avatar from "../../assets/login/Default.png";
import { UserContext } from "../../contexts/CurrentUser";
import Modal from "react-modal";
import { CommentsContext } from "../../contexts/CommentData";
import Post from "../Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import { LikesContext } from "../../contexts/LikesContext";

function Posts({ item, postID }) {
  Modal.setAppElement(document.getElementById("root"));
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "15px",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  };

  const { allLikes, addLikeToDB, removeLikeFromDB} = useContext(LikesContext);
  const { currentUser, isDeleteOpen, setIsDeleteOpen } =
    useContext(UserContext);
  const { deleteAllCommentsFromDB, setDeletedPost, deletePostFromDB, deleteAllPhotoLikes } =
    useContext(PostContext);
  const { commentTable, addCommentToDB } = useContext(CommentsContext);
  const navigate = useNavigate();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { data } = useSubscription(GET_ALL_USERS, {
    variables: { id: item.userID },
  });

  const likedPhotos = allLikes.filter((like) => {
    return item.id === like.postRef;
  });

  const combinedLikedPhotos = [].concat(...likedPhotos);


 
  const findFinal = combinedLikedPhotos.filter((item)=>{
    return item.userID === currentUser.id
  })

  console.log(findFinal, "helpp....")

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentToDB(commentValue, item.id);
    setCommentValue("");
    const newComment = e.target.elements.comment.value;
    setComments((prev) => [...prev, newComment]);
  };

  const handleDeletingAllPostData = () => {
    deleteAllCommentsFromDB();
    deletePostFromDB();
    deleteAllPhotoLikes();
    // !! do deletion for likes !! make sure to pass the photo.id not the whole object 
    setIsDeleteOpen(false);
  };

  const deletePostSelected = (post) => {
    setDeletedPost(post);
    setIsDeleteOpen(true);
  };

  const filteredComments = commentTable?.filter(
    (comment) => comment?.postRef === item.id
  );

  return (
    <div className="single-insta-post" id={item.userID}>
      <div className="username-insta-section">
        <div
          className="user-insta-left"
          onClick={() => navigate(`/profile-page/${item.userID}`)}
        >
          <img
            src={data?.userData[0]?.avatar ? data?.userData[0]?.avatar : Avatar}
            alt={data?.userData[0]?.avatar}
          />
          <p>{data?.userData[0]?.username}</p>
        </div>
        {currentUser.id === item.userID && (
          <img
            src={dotDark}
            alt="dots"
            onClick={() => deletePostSelected(item)}
            className="post-delete-btn"
          />
        )}
        <Modal
          isOpen={isDeleteOpen}
          style={customStyles}
          // closes the modal if you click outside the image
          onRequestClose={() => setIsDeleteOpen(false)}
          contentLabel="Delete Post Modal"
        >
          <div className="delete-post-modal">
            <p className="delete-post-btn" onClick={handleDeletingAllPostData}>
              Delete
            </p>
            <p onClick={() => setIsDeleteOpen(false)}>Cancel</p>
          </div>
        </Modal>
      </div>
      <div className="user-insta-img">
        <img src={item.image} alt={item.caption} />
      </div>
      <div className="interact-insta-section">
        <div className="interact-insta-left">
          <button>
            {findFinal[0]?.userID === currentUser.id ? (
              <AiFillHeart onClick={() => removeLikeFromDB(item.id)}
              className="like-filled like-btn" />
            ) : (
              <AiOutlineHeart onClick={() => addLikeToDB(item.id)}className="like-btn" />
            )}
          </button>
          <button>
            <img src={commentIMG} onClick={() => setPostModalOpen(true)}/>
          </button>
        </div>
      </div>
      <div className="comment-insta-container">
        <p className="comment-insta-likes">
          {likedPhotos.length === 1
            ? `${likedPhotos.length} like`
            : likedPhotos.length > 1
            ? `${likedPhotos.length} likes`
            : `${likedPhotos.length} likes`}
        </p>
        <p className="caption-insta">
          {data?.userData[0]?.username} <span>{item.caption}</span>
        </p>
        <p
          className="comment-count-insta"
          onClick={() => setPostModalOpen(true)}
        >
          {filteredComments.length > 1 &&
            `View all ${filteredComments.length} comments`}
        </p>
        {comments.map((comment) => (
          <p key={comment} className="added-comment-insta">
            <span className="comment-user">{currentUser.username} :</span>
            <span className="comment-text">{comment}</span>
          </p>
        ))}
        <div className="comment-section-insta">
          <form onSubmit={handleSubmit}>
            <input
              name="comment"
              placeholder="Add a comment…"
              className="add-comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </form>
          <img src={smile} alt="smile" />
        </div>
        <Modal
          isOpen={postModalOpen}
          onRequestClose={() => setPostModalOpen(false)}
          style={customStyles}
          contentLabel="pop up post modal"
        >
          <Post userData={item} userLike={likedPhotos} />
        </Modal>
      </div>
    </div>
  );
}

export default Posts;
