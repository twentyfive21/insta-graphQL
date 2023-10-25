import { useState,useContext } from "react";
import "./AddPost.css";
import avatar from '../../assets/nav/avatar.png'
import defaultImage from "../../assets/userpostdefualt.png";
import { v4 as uuid } from "uuid";
import { ImArrowLeft2 } from "react-icons/im";
import { UserContext } from '../../contexts/CurrentUser';
import { ADD_POST } from '../../utils/mutations.js'
import { useMutation } from "@apollo/client";

function AddPost() {
  const {currentUser,setIsOpen} = useContext(UserContext);
  const [userImage, setUserImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userReady, setUserReady] = useState(false)

  function getUserImage(e) {
    const file = e.target.value;
    setSelectedImage(file);
    setUserImage(true);
  }

  function restImage(){
  setSelectedImage('');
  setUserImage(false)
  setUserReady(false)
  }

  function userReadyToPost(){
    setUserImage(false);
    setUserReady(true)
  }

  const [postData, setPostData] = useState({
    caption: "",
    image: "",
    userID: currentUser.id,
    postUsername: currentUser.username,
    postAvatar: currentUser.avatar,
  });

  const [addPost] = useMutation(ADD_POST);

  const handlePostData = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
      image: selectedImage,
  })
  }

  const addPostToDB = async (postData) => {
    try {
      const { caption, image, userID, postUsername, postAvatar } = postData;
       await addPost({
        variables: {
          caption: caption.length > 0 ? caption : null,
          image: image.length > 0 ? image : null,
          userID: userID.length > 0 ? userID : null,
          postUsername: postUsername.length > 0 ? postUsername : null,
          postAvatar: postAvatar.length > 0 ? postAvatar : null,
        },
      });
      console.log('success')
    } catch (error) {
      console.error(error);
      alert("Error posting data");
    }
  };

  function submitPost(){
    addPostToDB(postData)
    setUserImage(false);
    setSelectedImage("");
    setUserReady(false);
    setIsOpen(false);
  }

  return (
    <div className="add-post-container">
      <div className="add-post-header">
        {(selectedImage || userReady) && <ImArrowLeft2 onClick={restImage}/>}
        <h2>Create New Post</h2>
        {userImage? <p onClick={userReadyToPost}>Continue</p> : userReady? <p onClick={submitPost}>share</p> : ''}
        
      </div>
      {userImage ? (
  <div className="user-post-container" style={{
    backgroundImage: `url(${selectedImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '78.9vh',
   backgroundSize: 'contain'
  }}>
  </div>
) : userReady ? (
  <div className="user-final-stage-container">
    <div className="user-final-stage-image"style={{
    backgroundImage: `url(${selectedImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
   backgroundSize: 'contain'
  }}>
      
    </div>
    <div className="user-final-stage-caption">
      <div className='user-post-div'><img src={currentUser.avatar? currentUser.avatar : avatar}/> <p>{currentUser.username}</p> </div>
      <textarea name="caption" id="captionId" cols="30" rows="10" maxLength={400} onChange={handlePostData}>

      </textarea>
    </div>
  </div>
) : (
  <div className="post-default-container">
    <img src={defaultImage} alt="Default" />
    <h2>Drag photos and videos here</h2>
    {/* <label htmlFor="img" className="custom-file-upload">
      Select from computer
    </label>
    <input type="file" id="img" name="img" accept="image/*" onChange={getUserImage} /> */}
    <input type="text" onChange={getUserImage}/>
  </div>
)}

    </div>
  );
}

export default AddPost;
