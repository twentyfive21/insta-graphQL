import React, {useState} from 'react'
import './UserLogin.css'
import Login from '../../components/Login/Login'
import SignUp from '../../components/SignUp/SignUp'
function UserLogin() {

   const [login, setLogin] = useState(false)
   const [signUp, setSignUp] = useState(false)

  return (
    <div>
    WELCOME 
    {/* delete when uploading */}
    <Login />
    {/* <SignUp /> */}
    </div>
  )
}


export default UserLogin