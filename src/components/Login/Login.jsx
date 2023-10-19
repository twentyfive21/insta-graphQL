import React,{useState} from 'react'
import './Login.css'

function Login() {
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });
    
    const handleLogin = (e) => {
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
    <form onSubmit={handleLogin}>
        {/* For testing purposes to see the data coming back
        <p>email: {userLogin.email}</p>
        <p>password:{userLogin.password}</p> */}
        {/* Email Input */}
        <input onChange={handleInput}
        name='email'
        value={userLogin.email}
        placeholder='Email'
        />
        {/* Password Input */}
        <input onChange={handleInput}
        name='password'
        value={userLogin.password}
        placeholder='Password'
        />
        <button type='submit'>Log In</button>
    </form>
  )
}

export default Login