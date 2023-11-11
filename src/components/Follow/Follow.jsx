import {useContext} from "react";
import "./Follow.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/login/default.jpg";
import { UserContext } from "../../contexts/CurrentUser";

function Follow({ item, style }) {
  const navigate = useNavigate();
  const {darkMode} = useContext(UserContext)
  return (
    <div className={darkMode ? "follow-section darkUI-sidebar" : "follow-section"} style={style}>
      <div className="follow-left">
        <img src={item.avatar ? item.avatar : Avatar} alt={item.username} />
        <div>
          <p className={darkMode ? "follow-top-dark" : "follow-top"}>{item.username}</p>
          <p className="follow-bottom">{item.username}</p>
        </div>
      </div>
      <p
        className="blue-text"
        onClick={() => navigate(`/profile-page/${item.id}`)}
      >
        View Profile
      </p>
    </div>
  );
}

export default Follow;
