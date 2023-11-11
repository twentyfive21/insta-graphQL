import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import Header from "../../components/Header/Header";
import { UserContext } from "../../contexts/CurrentUser";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import { GET_ALL_USERS } from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";
import Modal from "react-modal";
import Post from "../../components/Post/Post";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import AddPost from "../../components/AddPost/AddPost";
import SetAvatar from "../../components/SetAvatar/SetAvatar";
import Spinner from "../../components/Spinner";
import { PostContext } from "../../contexts/PostContext";
import { useParams, useNavigate } from "react-router-dom";
import { LikesContext } from "../../contexts/LikesContext";


Modal.setAppElement(document.getElementById("root"));

function ProfilePage() {
  const { currentUser, setSettings, setIsOpen, data, modalIsOpen, darkMode, setDarkMode } =
    useContext(UserContext);
  const { settingsModal, setSettingsModal } = useContext(PostContext);
  const { allLikes } = useContext(LikesContext);
  const { userid } = useParams();
  const [postModal, setPostModal] = useState(false);
  const userPostsArray = data?.userPosts;
  let filteredPosts = [];
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState([]);
  const { data: userPostMatchData } = useSubscription(GET_ALL_USERS, {
    variables: { id: userid },
  });

  function closeModal() {
    setSettingsModal(false);
  }

  function mapData() {
    for (let i = 0; i < userPostsArray?.length; i++) {
      if (userPostsArray[i]?.userID === userid) {
        filteredPosts?.push(userPostsArray[i]);
      }
    }
  }

  function modalWithData(post) {
    setSelectedImage(post);
    setSettingsModal(true);
  }

  const handlePostModalProfile = () => {
    setIsOpen(!modalIsOpen);
  };

  if (!userPostsArray) {
    return <Spinner />;
  } else {
    mapData();
  }

  const postsWithLikes = filteredPosts?.map((post) =>
    allLikes?.filter((like) => like?.postRef === post?.id)
  );


  const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
     backgroundColor: darkMode ? "black" : "white",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
};

  if (!userPostMatchData) {
    return <Spinner />;
  }

  const combinedPosts = [].concat(...postsWithLikes);
  return (
    <div style={{
  background: darkMode ? "black" : "white"
}}>
      <Header />
      <div className={darkMode? "main-profile-container darkUI": "main-profile-container"}>
        <div className={darkMode? "profile-sidebar darkUI" : "profile-sidebar"}>
          <div className="icon-divs" onClick={() => navigate("/feed")}>
            <PiHouseFill /> <h3>Home</h3>
          </div>
          <div className="icon-divs" onClick={handlePostModalProfile}>
            <LuPlusSquare /> <h3>Create</h3>
          </div>
          <div
            className="icon-divs"
            onClick={() => navigate(`/profile-page/${currentUser?.id}`)}
          >
            <img src={currentUser?.avatar ? currentUser?.avatar : imagD} />{" "}
            <h3>Profile</h3>{" "}
          </div>
          <div className="icon-divs" onClick={()=>setDarkMode(!darkMode)}>
           {darkMode? <BiSun/> : <GoMoon/>}<h3>Dark Mode</h3>
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
          <SetAvatar userParam={userPostMatchData} />
          <p>{userPostMatchData?.userData[0]?.username}</p>
          <p>Posts : {filteredPosts?.length} </p>
        </div>
        <SettingsModal />
        <section className="grid-photo-container">
          {filteredPosts?.map((post) => (
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
          contentLabel="User Post"
        >
          <Post userData={selectedImage} userLike={combinedPosts} />
        </Modal>
      </div>
    </div>
  );
}

export default ProfilePage;
