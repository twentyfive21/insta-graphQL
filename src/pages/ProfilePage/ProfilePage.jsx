import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import Header from "../../components/Header/Header";
import { UserContext } from "../../contexts/CurrentUser";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import { GET_ALL_USER_POSTS } from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";
import Modal from "react-modal";
import Post from "../../components/Post/Post";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddPost from "../../components/AddPost/AddPost";
import SetAvatar from "../../components/SetAvatar/SetAvatar";
import Spinner from "../../components/Spinner";


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
  const [settingsModal, setSettingsModal] = useState(false);
  const { currentUser, setSettings, setIsOpen, data, modalIsOpen } =
    useContext(UserContext);
  // const { data } = useSubscription(GET_ALL_USER_POSTS);
  const [postModal, setPostModal] = useState(false);
  const userPostsArray = data?.userPosts;
  let filteredPosts = [];
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState({
    userName: currentUser.username,
    userAvatar: currentUser.avatar,
  });

  function closeModal() {
    setSettingsModal(false);
  }

  function mapData() {
    for (let i = 0; i < userPostsArray.length; i++) {
      if (userPostsArray[i].userID === currentUser.id) {
        filteredPosts.push(userPostsArray[i]);
      }
    }
  }

  function modalWithData(post) {
    setSelectedImage((prevState) => ({ ...prevState, ...post }));
    setSettingsModal(true);
  }

  const handlePostModalProfile = () => {
    // setPostModal(!postModal);
    setIsOpen(!modalIsOpen);
  };

  if (!userPostsArray) {
    return <Spinner />
  }else{
      mapData();
  }
  



  return (
    <>
      <Header />
      <div className="main-profile-container">
        <div className="profile-sidebar">
          <div className="icon-divs" onClick={() => navigate("/feed")}>
            <PiHouseFill /> <h3>Home</h3>
          </div>
          <div className="icon-divs" onClick={handlePostModalProfile}>
            <LuPlusSquare /> <h3>Create</h3>
          </div>
          <div className="icon-divs" onClick={() => navigate("/profile-page")}>
            <img src={currentUser.avatar ? currentUser.avatar : avatar} />{" "}
            <h3>Profile</h3>{" "}
          </div>
          <div className="icon-divs">
            <BiSun /> <h3>Dark mode</h3>
          </div>
          <div className="icon-divs" onClick={() => setSettings(true)}>
            {" "}
            <CiSettings className="user-settings" /> <h3>Settings</h3>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handlePostModalProfile}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <AddPost profileFunc={setPostModal} />
          </Modal>
        </div>
        <div className="profile-container">
         <SetAvatar />
          <p>{currentUser.username}</p>
          <p>Posts : {filteredPosts.length} </p>
        </div>
        <SettingsModal />
        <section className="grid-photo-container">
          {filteredPosts.map((post) => (
            <img
              src={post?.image}
              alt={post?.caption}
              key={post?.id}
              onClick={() => {
                modalWithData(post);
              }}
              className="grid-photo-item"
            />
          ))}
        </section>
        <Modal
          isOpen={settingsModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Post userData={selectedImage} />
        </Modal>
      </div>
    </>
  );
}

export default ProfilePage;
