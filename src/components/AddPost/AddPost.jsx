import { useState,useContext } from "react";
import "./AddPost.css";
import avatar from '../../assets/login/Default.png'
import defaultImage from "../../assets/userpostdefualt.png";
import { v4 as uuid } from "uuid";
import { ImArrowLeft2 } from "react-icons/im";
import { UserContext } from '../../contexts/CurrentUser';
import { ADD_POST } from '../../utils/mutations.js'
import { useMutation } from "@apollo/client";

function AddPost({profileFunc}) {
  const {currentUser,setIsOpen} = useContext(UserContext);
  const [userImage, setUserImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userReady, setUserReady] = useState(false)
  const [textCount, setTextCount] = useState(0);

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
      const { caption, image, userID } = postData;
       await addPost({
        variables: {
          caption: caption.length > 0 ? caption : null,
          image: image.length > 0 ? image : null,
          userID: userID.length > 0 ? userID : null,
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
    profileFunc(false)
  }

  return (
    <div className="add-post-container">
      <div className="add-post-header">
        {(selectedImage || userReady) && <ImArrowLeft2 onClick={restImage}/>}
        <h2>Create New Post</h2>
        {userImage? <p onClick={userReadyToPost}>Continue</p> : userReady? <button type="button" disabled={textCount ? false : true} onClick={submitPost}>Share</button> : ''}
        
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
      <textarea name="caption" id="captionId" cols="30" rows="10" maxLength={400} onChange={handlePostData} placeholder="Write a caption..." onInput={(e)=> setTextCount(e.target.value)} required>

      </textarea>
      <p>{textCount.length}/400</p>
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
