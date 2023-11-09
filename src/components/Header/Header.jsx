import "./Header.css";
import logo from "../../assets/nav/logo.png";
import { useNavigate } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import Modal from "react-modal";
import { useState, useContext} from "react";
import { UserContext } from "../../contexts/CurrentUser";
import { PiHouseFill } from "react-icons/pi";
import { LuPlusSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

function Header() {
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
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
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  };

  Modal.setAppElement(document.getElementById("root"));

const close = () =>{
  setHamburgerOpen(false)
}
  return (
    <div className="header-main">
      <img
        src={logo}
        alt="instagram logo"
        className="instagram-logo"
        onClick={() => navigate("/feed")}
      />
      <div className="hamburger-icon" onClick={()=> setHamburgerOpen(true)}>
        <PiHouseFill/>
        <LuPlusSquare />
        <img src={currentUser?.avatar} />
        <CiSettings />
      </div>
       <Modal
          isOpen={hamburgerOpen}
          onRequestClose={close}
          style={customStyles}
          contentLabel="Add New Post"
        ></Modal>
    </div>
  );
}

export default Header;
