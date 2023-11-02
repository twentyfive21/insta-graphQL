import "./UserLogin.css";
import phone from "../../assets/login/instaPhone.png";
import logo from "../../assets/login/Instagram_logo.svg.png";
import apple from "../../assets/login/apple.PNG";
import google from "../../assets/login/google.PNG";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CHECK_USER } from "../../utils/queries";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/CurrentUser";

export default function UserLogin() {
  const { setUser, setCurrentUser} = useContext(UserContext);

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = login;
  const { loading, error, data } = useQuery(CHECK_USER, {
    variables: { email, password },
  });

  const handleInputLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

   const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (!loading && !error && data && data.userData.length > 0) {
      const { avatar, email, id, username } = data.userData[0]; // Assuming there's only one matching user
      setUser(true);
      setCurrentUser({
        id,
        email,
        avatar,
        username,
      });
      navigate("/feed/");
    } else {
     console.log("error logging in")
    }
  };

  return (
    <div className="login-div-container">
      <div className="phone-container">
        <img src={phone} alt="phone" />
      </div>
      <div className="login-container">
        <img src={logo} alt="logo" />

        <form className="login-form-container">
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            onChange={handleInputLogin}
            name="email"
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            onChange={handleInputLogin}
            name="password"
            onKeyPress={handleEnterKeyPress}
            required
          />
          <button className="login-btn" onClick={handleLogin}>
            Log In
          </button>
        </form>

        <div className="login-or-option">
          <p className="line"></p>
          <p>OR</p>
          <p className="line"></p>
        </div>
        <div className="optional-box">
          <p>
            Dont Have an account?{" "}
            <span onClick={() => navigate("/sign-up")}>Sign Up</span>
          </p>
        </div>
        <p className="app-header">Get the app.</p>
        <div className="app">
          <a href="https://apps.apple.com/us/app/instagram/id389801252?vt=lo">
            <img src={apple} />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D170675B1-378F-4EBE-BEFB-602B3D432842%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%3A%2F%2Fwww.instagram.com%2Fluckideveloper%2F">
            <img src={google} />
          </a>
        </div>
      </div>
    </div>
  );
}
