import { useState, useContext } from "react";
import "./Collab.css";
import details from "../../assets/posts/dots.png";
import Modal from "react-modal";
import { PostContext } from "../../contexts/PostContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/CurrentUser";

function Collab({ userData }) {
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

  const { currentUser } = useContext(UserContext);
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
  return (
    <div className="collab-container">
      <div className="collab-left">
        <img src={userData?.avatar} className="p-circle" alt="profile pic" />
        <p>
          <span>{userData?.username}</span>
        </p>
      </div>
      {currentUser.id === userid && (
        <img
          src={details}
          alt="detail dots"
          className="dots"
          onClick={handleDelete}
        />
      )}
      <Modal
        isOpen={postDeleteModal}
        onRequestClose={() => setPostDeleteModal(false)}
        style={customStyles}
        contentLabel="Pop Up Post Modal"
      >
        <div className="delete-modal-options">
          <p onClick={handleDeletingAllPostData}>Delete</p>
          <p onClick={() => setPostDeleteModal(false)}>Cancel</p>
        </div>
      </Modal>
    </div>
  );
}

export default Collab;
