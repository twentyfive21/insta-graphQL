import React, {useState} from 'react'
import './Login.css'


function Login() {
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleInput = (e) => {
        e.preventDefault();
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

  return (
    <form onSubmit={handleSubmit} className="login-container">
        {/* For testing purposes to see the data coming back
        <p>email: {userLogin.email}</p>
        <p>password:{userLogin.password}</p> */}
        {/* Email Input */}
        <input onChange={handleInput}
        name='email'
        value={userLogin.email}
        placeholder='Email'
        className="form-input"
        />
        {/* Password Input */}
        <input onChange={handleInput}
        name='password'
        value={userLogin.password}
        placeholder='Password'
        className="form-input"
        />
        <button type='submit'>Log In</button>
    </form>
  )
}

export default Login