import  { useState } from "react";
import "./UserLogin.css";
import phone from "../../assets/login/instaPhone.png";
import phone2 from "../../assets/login/instaSignUp.png"
import logo from "../../assets/login/Instagram_logo.svg.png";
import apple from "../../assets/login/apple.PNG";
import google from "../../assets/login/google.PNG";
// import SignUp from "../../components/SignUp/SignUp";
// import Login from "../../components/Login/Login";
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const [userChoice, setUserChoice] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [signUp, setSignUp] = useState(false);

  const user = () =>{
    setUserChoice(!userChoice);
  }

  
  if(userChoice){
    return <UserSignUp />
  }

  return (
    <div className="login-div-container">
      <div className="phone-container">
        <img src={phone} alt="phone" />
      </div>
      <div className="login-container">
        <img src={logo} alt="logo" />
        {/* <Login /> */}

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
            Dont Have an account? <span onClick={user}>Sign Up</span>
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


  function UserSignUp(){
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({
        email: '',
        password: '',
        username: '',
    });

    const [addUser] = useMutation(ADD_USER);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleSignUp = (e) => {
        setSignUp({
            ...signUp,
            [e.target.name]: e.target.value
        })
    }

    const addUserToDB = async (user) => {
        try {
            const { email, password, username} = user;
            await addUser({
                variables: {
                    email: email.length > 0 ? email : null,
                    password: password.length > 0 ? password : null,
                    username: username.length > 0 ? username : null,
                },
            })
            setSignUp({
                email: '',
                password: '',
                username: '',
            })
            navigate('/feed');
        } catch (error) {
            console.log(error);
        }
    };

    
  return(
    <div className="signUp-div-container">
      <div className="phone-container">
        <img src={phone2} alt="phone" />
      </div>
      <div className="signUp-container">
        <img src={logo} alt="logo" />
        <h3>Sign up to see photos and videos from your friends.</h3>

        <div className="signUp-form-container">
          {/* <SignUp /> */}
          {/* <input type="text" className="form-input" placeholder="Email" />
            <input type="text" className="form-input" placeholder="Full Name" />
          <input type="text" className="form-input" placeholder="Username" />
          <input type="text" className="form-input" placeholder="Password" /> */}
           <form onSubmit={handleSubmit}>
        {/* email */}
        <input name='email' onChange={handleSignUp}
        placeholder='Email'value={signUp.email} className="form-input"/>
        {/* username */}
        <input name='username' onChange={handleSignUp}
        placeholder='Username' value={signUp.username} className="form-input"/>
        {/* password */}
        <input name='password' onChange={handleSignUp}
        placeholder='Password' value={signUp.password} className="form-input"/>
         <button className="signUp-btn" onClick={addUserToDB}>Sign Up</button>
    </form>
         
          <div className="signUp-copyright">
            <p>People who use our service may have uploaded your contact information to Instagram. <span>Learn More</span></p>
            <p>By signing up, you agree to our <span>Terms , Privacy Policy and Cookies Policy .</span></p>
          </div>
          <button className="signUp-btn">Sign Up</button>
        </div>

        <div className="signUp-or-option">
          <p className="line"></p>
          <p>OR</p>
          <p className="line"></p>
        </div>
        <div className="signUp-optional-box">
          <p>
           Have an account? <span onClick={user}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
}

