import "./UserLogin.css";
import { useState } from "react";
import phone from "../../assets/login/instaPhone.png";
import logo from "../../assets/login/Instagram_logo.svg.png";
import apple from "../../assets/login/apple.PNG";
import google from "../../assets/login/google.PNG";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [UserLogin] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await UserLogin({
        variables: { email, password },
      });
      if (data.UserLogin.error) {
        alert(data.UserLogin.error); // Display error message to the user
      } else {
        navigate('/feed');
        // Save the token (data.loginUser.token) in a secure manner for future requests
        // Redirect the user or perform any other necessary action for a successful login
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="login-div-container">
      <div className="phone-container">
        <img src={phone} alt="phone" />
      </div>
      <div className="login-container">
        <img src={logo} alt="logo" />

        <div className="login-form-container">
          <input
            type="text"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" onClick={handleLogin}>Log In</button>
        </div>

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
