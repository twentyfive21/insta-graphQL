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
  const { deleteAllCommentsFromDB, setDeletedPost, deletePostFromDB } = useContext(PostContext);
  const [postModalOpen, setPostModalOpen] = useState(false)

  const handleDeletingAllPostData = () => {
    deleteAllCommentsFromDB() 
    deletePostFromDB()
    setPostModalOpen(false);
  }

  const handleDelete = () => {
    setPostModalOpen(true)
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
          isOpen={postModalOpen}
          onRequestClose={()=>setPostModalOpen(false)}
          style={customStyles}
          contentLabel="pop up post modal"
        >
         <p onClick={handleDeletingAllPostData}>Delete</p>
         <p onClick={()=>setPostModalOpen(false)}>cancel</p>
        </Modal>
    </div>
  );
}

export default Collab;
