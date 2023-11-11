import React, { useState, useContext, useEffect } from "react";
import "./Homepage.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/CurrentUser";
import avatar from "../../assets/login/default.jpg";
import Modal from "react-modal";
import AddPost from "../../components/AddPost/AddPost";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import { GET_POSTS } from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";
import Spinner from "../../components/Spinner";
import Follow from "../../components/Follow/Follow";
import { GET_ALL_USERS_SIDE_BAR } from "../../utils/subscriptions";
import imageDefault from "../../assets/posts/userpostdefualt.png"


Modal.setAppElement(document.getElementById("root"));

function Homepage() {
  const navigate = useNavigate();
  const { currentUser, setSettings, modalIsOpen, setIsOpen, darkMode, setDarkMode } =
    useContext(UserContext);
  // const [limit, setLimit] = useState(4);
  const [posts, setPosts] = useState([]);
  const { data, loading } = useSubscription(GET_POSTS);
  const { data: allUsersData } = useSubscription(GET_ALL_USERS_SIDE_BAR);

  useEffect(() => {
    if (!loading && data && data?.userPosts.length > 0) {
      setPosts(data?.userPosts);
    }
  }, [loading, data]);

  const viewProfile = () => {
    navigate(`/profile-page/${currentUser?.id}`);
  };

  function changeThemeForUserComfort() {
  setDarkMode(!darkMode)
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (loading && posts?.length === 0 && !allUsersData) {
    return <Spinner />; // Show full-page spinner during initial load
  }
  

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
   <div style={darkMode ? { background: "black" } : null}>
      <Header />
      <section className={darkMode? "main-container darkUI" : "main-container"}>
        <div className="double-container">
        <div className={darkMode? "sidebar darkUI" : "sidebar"}>
          <div className="icon-divs" onClick={() => navigate("/feed")}>
            <PiHouseFill /> <h3>Home</h3>
          </div>
          <div className="icon-divs" onClick={openModal}>
            <LuPlusSquare /> <h3>Create</h3>
          </div>
          <div className="icon-divs" onClick={viewProfile}>
            <img
              src={currentUser?.avatar ? currentUser?.avatar : avatar}
              alt="Profile"
            />{" "}
            <h3>Profile</h3>{" "}
          </div>
          <div className="icon-divs" onClick={changeThemeForUserComfort}>
            {darkMode? <BiSun/> : <GoMoon/>}<h3>Dark Mode</h3>
          </div>
          <div className="icon-divs" onClick={() => setSettings(true)}>
            {" "}
            <CiSettings /> <h3>Settings</h3>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add New Post"
          >
            <AddPost />
          </Modal>
          <SettingsModal />
          
        </div>
        <div className="follow-sidebar-2">
          <Follow
            item={currentUser}
            style={darkMode ? { borderBottom: "0.1px solid #606060" } : { borderBottom: "1px solid #D0D0D0" }}
          />
          <div className={darkMode? "right-sug darkUI" : "right-sug"}>
            <p>Suggestions for you</p>
          </div>
          {allUsersData?.userData?.map((item) => {
            return <Follow item={item} key={item?.id} />;
          })}
        </div>
      </div>

        <div className="all-posts">
          {posts?.map((post) => (
            <Posts item={post} key={post?.id} />
          ))}
        </div>
        <div className="follow-sidebar">
          <Follow
            item={currentUser}
            style={darkMode ? { borderBottom: "0.1px solid #606060" } : { borderBottom: "1px solid #D0D0D0" }}
          />
          <div className={darkMode? "right-sug darkUI" : "right-sug"}>
            <p>Suggestions for you</p>
          </div>
          {allUsersData?.userData?.map((item) => {
            return <Follow item={item} key={item?.id} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
