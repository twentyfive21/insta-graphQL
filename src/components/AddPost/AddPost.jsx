import { useState,useContext, useRef, useCallback } from "react";
import "./AddPost.css";
import avatar from '../../assets/login/Default.png'
import defaultImage from "../../assets/userpostdefualt.png";
import { v4 as uuid } from "uuid";
import { ImArrowLeft2 } from "react-icons/im";
import { UserContext } from '../../contexts/CurrentUser';
import { ADD_POST } from '../../utils/mutations.js'
import { useMutation } from "@apollo/client";
import Webcam from "react-webcam";

function AddPost({profileFunc}) {
  const {currentUser,setIsOpen} = useContext(UserContext);
  const [userImage, setUserImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userReady, setUserReady] = useState(false)
  const [textCount, setTextCount] = useState(0);
  const [capture, setCapture] = useState(false);
  const webcamRef = useRef(null); 
console.log(selectedImage)

 function getUserImage(e) {
    const file = e.target.files[0]; // Get the selected file

    // Check if a file is selected
    if (file) {
        const reader = new FileReader();
        
        // Read the file as data URL
        reader.readAsDataURL(file);

        // Set up the callback function for when the file is loaded
        reader.onloadend = () => {
            // The result contains the data URL
            const dataURL = reader.result;
            setSelectedImage(dataURL);
            setUserImage(true);
        };
    }
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


  const captureFunc = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setSelectedImage(image);
    setCapture(false)
    setUserImage(true)
  }, [webcamRef]);

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
    {
      capture?
      <Webcam height={600} width={600} ref={webcamRef} />
      :
    <>
     <img src={defaultImage} alt="Default" />
    <h2>Drag photos and videos here</h2>
    <input type="text" onChange={getUserImage}/>
    </>
    }
    <label htmlFor="img" className="custom-file-upload">
      Select from computer
    </label>
    <input type="file" id="img" name="img" accept="image/*" onChange={getUserImage} />
    {capture && <button onClick={captureFunc}>Take picture</button>}
    <button onClick={()=> setCapture(!capture)}>{capture? 'Go Back' : 'Take Photo from device'}</button>
  </div>
)}

    </div>
  );
}

export default AddPost;
