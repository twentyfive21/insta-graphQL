import "./UserLogin.css";
import phone from "../../assets/login/instaPhone.png";
import logo from "../../assets/login/Instagram_logo.svg.png";
import apple from "../../assets/login/apple.PNG";
import google from "../../assets/login/google.PNG";
import { useNavigate } from 'react-router-dom';


export default function UserLogin() {
  const navigate = useNavigate();


  return (
    <div className="login-div-container">
      <div className="phone-container">
        <img src={phone} alt="phone" />
      </div>
      <div className="login-container">
        <img src={logo} alt="logo" />

        <div className="login-form-container">
          <input type="text" className="form-input" placeholder="Email" />
          <input type="text" className="form-input" placeholder="Password" />
          <button className="login-btn">Log In</button>
        </div>

        <div className="login-or-option">
          <p className="line"></p>
          <p>OR</p>
          <p className="line"></p>
        </div>
        <div className="optional-box">
          <p>
            Dont Have an account? <span onClick={()=>navigate('/sign-up')}>Sign Up</span>
          </p>
        </div>
         <p className="app-header">Get the app.</p>
        <div className='app'>
          <a href="https://apps.apple.com/us/app/instagram/id389801252?vt=lo"><img src={apple} /></a>
           <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D170675B1-378F-4EBE-BEFB-602B3D432842%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%3A%2F%2Fwww.instagram.com%2Fluckideveloper%2F"><img src={google} /></a>
        </div>
      </div>
    </div>
  );

}

