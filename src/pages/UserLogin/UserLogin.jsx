import React, {useState} from 'react'
import './UserLogin.css'
import phone from "../../assets/login/instaPhone.png";
import logo from "../../assets/login/Instagram_logo.svg.png";

function UserLogin() {

   const [login, setLogin] = useState(false)
   const [signUp, setSignUp] = useState(false)

  return (
    <div className='login-div-container'>
      <div className='phone-container'>
        <img src={phone} alt='phone'/>
      </div>
      <div className='login-container'>
        <img src={logo} alt='logo'/>
          <div className='login-form-container'>
            <input type="text" className='form-input' placeholder='Email'/>
            <input type="text" className='form-input' placeholder='Password'/>
            <button className='login-btn'>Log In</button>
          </div>
          <div className='login-or-option'>
            <p className='line'></p>
            <p>OR</p>
            <p className='line'></p>
          </div>
          <div className='optional-box'>
            <p>Don't Have an account? <span>Sign Up</span></p>
          </div>
          <div className='get-the-app'>

          </div>
      </div>
    </div>
  )
}


export default UserLogin