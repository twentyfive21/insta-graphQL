import "./Header.css";
import logo from "../../assets/nav/logo.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState, useContext} from "react";
import { UserContext } from "../../contexts/CurrentUser";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { BiSun } from "react-icons/bi";
import apple from "../../assets/login/apple.png"
import play from "../../assets/login/google.png"

function Header() {
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const {currentUser} = useContext(UserContext)

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
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  Modal.setAppElement(document.getElementById("root"));

 const closeModal = () => {
    setHamburgerOpen(false);
  };

  const closeLogout = () => {
    setLogout(false);
  }

  const handleLogout = () => {
    navigate("/")
  };

  return (
    <div className="header-main">
      <img
        src={logo}
        alt="instagram logo"
        className="instagram-logo"
        onClick={() => navigate("/feed")}
      />
      <div className="hamburger-icon" >
        <PiHouseFill onClick={()=>navigate("/feed")}/>
        <LuPlusSquare onClick={()=> setHamburgerOpen(true)}/>
        <img src={currentUser?.avatar} onClick={()=>navigate(`/profile-page/${currentUser?.id}`)}/>
        <GoMoon />
        <CiSettings onClick={()=> setLogout(true)}/>
      </div>
      <Modal
        isOpen={logout}
        onRequestClose={closeLogout}
        style={customStyles}
        contentLabel="logout"
      >
        <div className="logout-modal-content">
          <h2>Are you sure you want to logout?</h2>
          <div className="buttons-container">
            <button className="cancel-button" onClick={closeLogout}>
              Cancel
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </Modal>
       <Modal
        isOpen={hamburgerOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Sorry, post can't be made"
      >
       <div className="modal-content">
  <h2>Oops! Unable to Create Post</h2>
  <p>We're sorry, but posts on mobile cannot be created using our website.</p>
  <p>Experience seamless posting by downloading our app from the Play Store or the App Store.</p>
  <div className="images-for-store">
    <a href="https://apps.apple.com/us/app/instagram/id389801252?vt=lo"><img src={apple} alt="apple" /></a>
    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D170675B1-378F-4EBE-BEFB-602B3D432842%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%3A%2F%2Fwww.instagram.com%2Fluckideveloper%2F">  <img src={play} alt="google" /></a>
  </div>
  <button onClick={closeModal}>Close</button>
</div>

      </Modal>
    </div>
  );
}

export default Header;
