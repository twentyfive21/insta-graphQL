import "./ProfilePage.css";
import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import { CiSettings } from "react-icons/ci";
import { UserContext } from "../../contexts/CurrentUser";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import { GET_POSTS } from "../../utils/subscriptions";
import { useSubscription} from "@apollo/client";
import Modal from "react-modal";
import Post from "../../components/Post/Post";
import SetAvatar from "../../components/SetAvatar/SetAvatar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
};
Modal.setAppElement(document.getElementById("root"));

function ProfilePage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { currentUser, setSettings } = useContext(UserContext);
  const { data } = useSubscription(GET_POSTS);
  const userPostsArray = data?.userPosts;
  let filteredPosts = [];
  const [selectedImage, setSelectedImage] = useState({
    userName: currentUser.username,
    userAvatar: currentUser.avatar,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function mapData() {
    for (let i = 0; i < userPostsArray.length; i++) {
      if (userPostsArray[i].userID === currentUser.id) {
        filteredPosts.push(userPostsArray[i]);
      }
    }
  }

  function modalWithData(post){
     setSelectedImage((prevState) => ({ ...prevState, ...post }));
     setIsOpen(true)
  }
  if (!userPostsArray) {
    return <p>loading</p>;
  }
  mapData();

  return (
    <div className="main-profile-container">
      <Header />
      <div className="profile-container">
        <SetAvatar />
        <p>{currentUser.username}</p>
        <p>Posts : 0 </p>
        <CiSettings onClick={()=>setSettings(true)} className="user-settings"/>
      </div>
      <SettingsModal />
      <section className="user-posts-container">
        {filteredPosts.map(post => (
          <img
            src={post?.image}
            alt={post?.caption}
            key={post?.id}
            onClick={()=>{modalWithData(post)}}
          />
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <Post userData={selectedImage} />
      </Modal>
    </div>
  );
}
export default ProfilePage;