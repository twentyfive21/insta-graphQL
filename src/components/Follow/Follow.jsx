import React from "react";
import "./Follow.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/login/default.jpg";

function Follow({ item, style }) {
  const navigate = useNavigate();
  return (
    <div className="follow-section" style={style}>
      <div className="follow-left">
        <img src={item.avatar ? item.avatar : Avatar} alt={item.username} />
        <div>
          <p className="follow-top">{item.username}</p>
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
