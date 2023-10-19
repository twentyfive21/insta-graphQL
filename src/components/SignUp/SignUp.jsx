import React,{useState} from 'react'
import './SignUp.css'

function SignUp() {
    const [signUp, setSignUp] = useState({
        email: '',
        password: '',
        username: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleSignUp = (e) => {
        setSignUp({
            ...signUp,
            [e.target.name]: e.target.value
        })
    }
  return (
    <form onSubmit={handleSubmit}>
        {/* email */}
        <input name='email' onChange={handleSignUp}
        placeholder='Email'value={signUp.email}/>
        {/* username */}
        <input name='username' onChange={handleSignUp}
        placeholder='Username' value={signUp.username}/>
        {/* password */}
        <input name='password' onChange={handleSignUp}
        placeholder='Password' value={signUp.password}/>
    </form>
  )
}

export default SignUp