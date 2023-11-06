import "./SettingsModal.css";
import React, { useState, useContext } from "react";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/CurrentUser";

function SettingsModal() {
  const { setUser, setCurrentUser, isOpen, setSettings } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logoutCurrentUser = () => {
    navigate("/");
    setUser(false);
    setCurrentUser({
      id: "",
      email: "",
      avatar: "",
      username: "",
    });
    setSettings(false);
  };
  const [darkMode, setDarkMode] = useState(false);

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
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      // closes the modal if you click outside the image
      onRequestClose={() => setSettings(false)}
      contentLabel="Settings Modal"
    >
      <div className="settings-container">
        <p onClick={() => setDarkMode(!darkMode)}>
          Dark mode {darkMode ? <GoMoon /> : <BiSun />}
        </p>
        <p onClick={logoutCurrentUser}>Log Out</p>
        <p onClick={() => setSettings(false)}>Cancel</p>
      </div>
    </Modal>
  );
}

export default SettingsModal;
