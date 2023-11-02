import {useState, useContext} from 'react';
import './Collab.css';
import details from '../../assets/dots.png';
import Modal from "react-modal";
import { PostContext } from '../../contexts/PostContext';

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
  const { deleteAllCommentsFromDB, setDeletedPost, deletePostFromDB, setSettingsModal} = useContext(PostContext);
  const [postDeleteModal, setPostDeleteModal] = useState(false)

  const handleDeletingAllPostData = async () => {
    try {
      // First, delete all comments
      await deleteAllCommentsFromDB();
      
      // Once comments are deleted, delete the post
      await deletePostFromDB();

      setSettingsModal(false);
      
      // Optionally, you can perform additional actions after both are successful.
    } catch (error) {
      console.error("Error deleting post and comments:", error);
    }
  }
  

  const handleDelete = () => {
    setPostDeleteModal(true)
    setDeletedPost(userData)
  }
  return (
    <div className='collab-container'>
      <div className='collab-left'>
        <img src={userData.avatar} className='p-circle' alt='profile pic' />
        <p><span>{userData.username}</span></p>
      </div>
      <img src={details} alt='detail dots' className='dots' onClick={handleDelete}/>
      <Modal
          isOpen={postDeleteModal}
          onRequestClose={()=>setPostDeleteModal(false)}
          style={customStyles}
          contentLabel="pop up post modal"
        >
          <div className='delete-modal-options'>
          <p onClick={handleDeletingAllPostData}>Delete</p>
         <p onClick={()=>setPostDeleteModal(false)}>cancel</p>
          </div>
        </Modal>
    </div>
  );
}

export default Collab;
