import { useState, useContext } from "react";
import "./Collab.css";
import details from "../../assets/posts/dots.png";
import Modal from "react-modal";
import { PostContext } from "../../contexts/PostContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/CurrentUser";
import loader from "../../assets/posts/loader.gif"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSubscription } from "@apollo/client";
import { GET_ALL_USERS } from "../../utils/subscriptions";


function Collab({ userData }) {
  Modal.setAppElement(document.getElementById("root"));


  const { currentUser, darkMode} = useContext(UserContext);
  const {
    deleteAllCommentsFromDB,
    setDeletedPost,
    deletePostFromDB,
    setSettingsModal,
    deleteAllPhotoLikes,
  } = useContext(PostContext);
  const [postDeleteModal, setPostDeleteModal] = useState(false);
  const { userid } = useParams();

  const handleDeletingAllPostData = async () => {
    try {
      // First, delete all comments
      await deleteAllCommentsFromDB();
      await deleteAllPhotoLikes();
      // Once comments are deleted, delete the post
      await deletePostFromDB();
      setSettingsModal(false);
      // Optionally, you can perform additional actions after both are successful.
    } catch (error) {
      console.error("Error deleting post and comments:", error);
    }
  };

  const handleDelete = () => {
    setPostDeleteModal(true);
    setDeletedPost(userData);
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

    const { data: userPostInfo } = useSubscription(GET_ALL_USERS, {
    variables: { id: userData?.userID },
  });
  return (
    <div className={darkMode? "collab-container darkpostUI" : "collab-container"}>
      <div className="collab-left">
        <img src={userPostInfo?.userData[0]?.avatar? userPostInfo?.userData[0]?.avatar : loader} className="p-circle" alt="profile" />
        <p>
          <span>{userData?.username}</span>
        </p>
      </div>
      {currentUser?.id === userData.userID && (
        <BiDotsHorizontalRounded  className="dots" onClick={handleDelete}/>
      )}
      <Modal
        isOpen={postDeleteModal}
        onRequestClose={() => setPostDeleteModal(false)}
        style={customStyles}
        contentLabel="Pop Up Post Modal"
      >
        <div className={darkMode? "delete-post-modal darkpostUI" : "delete-post-modal"}>
          <p onClick={handleDeletingAllPostData}>Delete</p>
          <p onClick={() => setPostDeleteModal(false)}>Cancel</p>
        </div>
      </Modal>
    </div>
  );
}

export default Collab;
