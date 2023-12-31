import React, { useContext, useState } from "react";
import "./Comment.css";
import { UserContext } from "../../contexts/CurrentUser";
import { CommentsContext } from "../../contexts/CommentData";
import Modal from "react-modal";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSubscription } from "@apollo/client";
import { GET_ALL_USERS } from "../../utils/subscriptions";
import loader from '../../assets/posts/loader.gif'
import { useNavigate } from "react-router-dom";

function Comment({ userData }) {


  Modal.setAppElement(document.getElementById("root"));

  const [isCommentModal, setIsCommentModal] = useState(false);
  const { avatar, comment, username, userID, createdAt } = userData;
  const { currentUser, darkMode} = useContext(UserContext);
  const { deleteCommentfromDB } = useContext(CommentsContext);
  const navigate = useNavigate();

    const { data: userDataComments } = useSubscription(GET_ALL_USERS, {
    variables: { id: userData?.userID },
  });

  // Convert the createdAt string to a JavaScript Date object
  const createdDate = new Date(createdAt);

  // Calculate the time difference in milliseconds
  const timeDifference = new Date() - createdDate;

  // Calculate the number of days ago
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Define a function to format the time difference
  function formatTimeAgo(days) {
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "1 day ago";
    } else {
      return `${days} days ago`;
    }
  }

  const handleDeletedComment = () => {
    deleteCommentfromDB(userData);
    setIsCommentModal(false);
  };


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "24px",
      padding: "40px",
      textAlign: "center",
      backgroundColor: darkMode ? "black" : "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div className={darkMode? "comment-container darkcommentUI" : "comment-container"}>
      <section className="comment-left">
        <img src={userDataComments?.userData[0].avatar? userDataComments?.userData[0].avatar : loader} alt={username} />
        <section>
          <p>
            <span onClick={()=>navigate(`/profile-page/${userID}`)} className="user-pr">{username}</span>
            {comment}
          </p>
          <div className="actions">
            <p>{formatTimeAgo(daysAgo)}</p>
          </div>
        </section>
        {userID === currentUser?.id && (
        <BiDotsHorizontalRounded  onClick={() => setIsCommentModal(true)} className="delete-comment"/>
      )}
      </section>
      <Modal
        isOpen={isCommentModal}
        onRequestClose={() => setIsCommentModal(false)}
        style={customStyles}
        contentLabel="delete modal for comment"
      >
        <div className="delete-post-modal">
          <p onClick={handleDeletedComment}>Delete</p>
          <p style={{ color: darkMode ? "white" : "black" }} onClick={() => setIsCommentModal(false)}>Cancel</p>
        </div>
      </Modal>
    </div>
  );
}

export default Comment;
