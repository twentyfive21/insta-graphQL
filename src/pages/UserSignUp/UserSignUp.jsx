import { useState } from "react";
import { ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import phone2 from "../../assets/login/instaSignUp.png";
import logo from "../../assets/login/Instagram_logo.svg.png";

function UserSignUp() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserToDB(signUp);
  };

  const handleSignUp = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const addUserToDB = async (user) => {
    try {
      const { email, password, username } = user;
      await addUser({
        variables: {
          email: email.length > 0 ? email : null,
          password: password.length > 0 ? password : null,
          username: username.length > 0 ? username : null,
        },
      });
      setSignUp({
        email: "",
        password: "",
        username: "",
      });
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert("error dummy")
    }
  };

  return (
    <div className="signUp-div-container">
      <div className="phone-container">
        <img src={phone2} alt="phone" />
      </div>
      <div className="signUp-container">
        <img src={logo} alt="logo" />
        <h3>Sign up to see photos and videos from your friends.</h3>

        <form className="signUp-form-container" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            name="email"
            value={signUp.email}
            onChange={handleSignUp}
          />

          <input
            type="text"
            className="form-input"
            placeholder="Username"
            name="username"
            value={signUp.username}
            onChange={handleSignUp}
          />

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            name="password"
            value={signUp.password}
            onChange={handleSignUp}
          />

          <div className="signUp-copyright">
            <p>
              People who use our service may have uploaded your contact
              information to Instagram. <span>Learn More</span>
            </p>
            <p>
              By signing up, you agree to our{" "}
              <span>Terms , Privacy Policy and Cookies Policy .</span>
            </p>
          </div>
          <button type="submit" className="signUp-btn">
            Sign Up
          </button>
        </form>

        <div className="signUp-or-option">
          <p className="line"></p>
          <p>OR</p>
          <p className="line"></p>
        </div>
        <div className="signUp-optional-box">
          <p>
            Have an account? <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignUp;
