import React, { useContext, useState } from "react";
import "./ProfilePage.css";
import basic from "../../assets/nav/basic.png";
import Header from "../../components/Header/Header";
import { UserContext } from "../../contexts/CurrentUser";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import { GET_POSTS } from "../../utils/subscriptions";
import { useSubscription, useMutation } from "@apollo/client";
import { ADD_AVATAR } from "../../utils/mutations";
import Modal from "react-modal";
import Post from "../../components/Post/Post";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddPost from "../../components/AddPost/AddPost";

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
  const [addAvatar] = useMutation(ADD_AVATAR);
  const { currentUser, setSettings, setCurrentUser, setIsOpen } =
    useContext(UserContext);
  const { data } = useSubscription(GET_POSTS);
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

  const handleAvatar = (e) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const addAvatarToDB = async (user) => {
    try {
      const { id, avatar } = user;
      //add the value of id to check the equal too
      await addAvatar({
        variables: {
          id: id,
          avatar: avatar.length > 0 ? avatar : null,
        },
      });
      alert("success");
    } catch (error) {
      console.error(error);
      alert("Error posting data");
    }
  };

  const handleFormForUpdate = (e) => {
    //when submitting a form it applies the same as for an input. you need to prevent it from refreshing.
    e.preventDefault();
    addAvatarToDB(currentUser);
  };

  function modalWithData(post) {
    setSelectedImage((prevState) => ({ ...prevState, ...post }));
    setSettingsModal(true);
  }

  const handlePostModalProfile = () => {
    setPostModal(!postModal);
    setIsOpen(false);
  };

  if (!userPostsArray) {
    return <p>loading</p>;
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
            isOpen={postModal}
            onRequestClose={handlePostModalProfile}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <AddPost profileFunc={setPostModal} />
          </Modal>
        </div>
        <div className="profile-container">
          <img
            src={currentUser.avatar ? currentUser.avatar : basic}
            alt="profile image"
            className="profile-image"
          />
          <form onSubmit={handleFormForUpdate}>
            <input
              placeholder="profile image"
              name="avatar"
              onChange={handleAvatar}
            />
            {/* <button type="submit">Submit</button> */}
          </form>
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
