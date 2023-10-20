// import React, {useState} from 'react'
// import './SignUp.css'
// import { ADD_USER } from '../../utils/mutations';
// import { useMutation } from '@apollo/client';
// import { useNavigate } from 'react-router-dom';

// function SignUp() {
//     const navigate = useNavigate();
//     const [signUp, setSignUp] = useState({
//         email: '',
//         password: '',
//         username: '',
//     });

//     const [addUser] = useMutation(ADD_USER);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     }

//     const handleSignUp = (e) => {
//         setSignUp({
//             ...signUp,
//             [e.target.name]: e.target.value
//         })
//     }

//     const addUserToDB = async (user) => {
//         try {
//             const { email, password, username} = user;
//             await addUser({
//                 variables: {
//                     email: email.length > 0 ? email : null,
//                     password: password.length > 0 ? password : null,
//                     username: username.length > 0 ? username : null,
//                 },
//             })
//             setSignUp({
//                 email: '',
//                 password: '',
//                 username: '',
//             })
//             navigate('/feed');
//         } catch (error) {
//             console.log(error);
//         }
//     };


//   return (
//     <form onSubmit={handleSubmit} className="signUp-form-container">
//         {/* email */}
//         <input name='email' onChange={handleSignUp}
//         placeholder='Email'value={signUp.email} className="form-input"/>
//         {/* username */}
//         <input name='username' onChange={handleSignUp}
//         placeholder='Username' value={signUp.username} className="form-input"/>
//         {/* password */}
//         <input name='password' onChange={handleSignUp}
//         placeholder='Password' value={signUp.password} className="form-input"/>
//          <button className="signUp-btn" onClick={addUserToDB}>Sign Up</button>
//     </form>
//   )
// }

// export default SignUp