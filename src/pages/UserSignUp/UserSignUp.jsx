import { useState, useContext } from "react";
import { ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import phone2 from "../../assets/login/instaSignUp.png";
import logo from "../../assets/login/Instagram_logo.svg.png";
import { UserContext } from "../../contexts/CurrentUser";
import defaultAvatar from "../../assets/login/Default.png";

function UserSignUp() {
  const { setCurrentUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorSignUp, setErrorSignUp] = useState(false);
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
      const { data } = await addUser({
        variables: {
          email: email.length > 0 ? email : null,
          password: password.length > 0 ? password : null,
          username: username.length > 0 ? username : null,
        },
      });

      const id = data.insert_userData.returning[0].id;
      setUser(true);
      setCurrentUser({
        id,
        email,
        avatar: defaultAvatar,
        username,
      });
      setSignUp({
        email: "",
        password: "",
        username: "",
      });

      navigate("/feed");
    } catch (error) {
      if (error.message && error.message.includes("email")) {
        setErrorSignUp("email");
      } else if (error.message && error.message.includes("username")) {
        setErrorSignUp("username");
      }
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
            value={signUp?.email}
            onChange={handleSignUp}
          />

          <input
            type="text"
            className="form-input"
            placeholder="Username"
            name="username"
            value={signUp?.username}
            onChange={handleSignUp}
            maxLength="20"
          />
          {signUp?.username.length === 20 ? (
            <p className="error-messages">Username Limit is 20 Characters</p>
          ) : (
            ""
          )}

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            name="password"
            value={signUp?.password}
            onChange={handleSignUp}
          />
          {signUp?.password.length > 0 && signUp?.password.length < 10 ? (
            <p className="error-messages">
              Password needs to be 10 Characters long
            </p>
          ) : (
            ""
          )}

          {errorSignUp && (
            <p className="error-messages-login">{`${errorSignUp} already exists, try a new ${errorSignUp}`}</p>
          )}

          <div className="signUp-copyright">
            <p>
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <Link to="https://www.facebook.com/help/instagram/261704639352628">
                Learn More
              </Link>
            </p>
            <p>
              By signing up, you agree to our{" "}
              <Link to="https://help.instagram.com/581066165581870/?locale=en_US">
                Terms , Privacy Policy and Cookies Policy .
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="signUp-btn"
            disabled={
              !signUp?.email?.includes("@") ||
              signUp?.username.length <= 4 ||
              (signUp?.password.length !== 10 && signUp?.password.length <= 10)
            }
          >
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
