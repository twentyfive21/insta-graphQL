import { useState, useContext, useRef, useCallback } from "react";
import "./AddPost.css";
import defaultImage from "../../assets/posts/userpostdefualt.png";
import { ImArrowLeft2 } from "react-icons/im";
import { UserContext } from "../../contexts/CurrentUser";
import { ADD_POST } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import Webcam from "react-webcam";

function AddPost() {
  const { currentUser, setIsOpen, darkMode } = useContext(UserContext);
  const [userImage, setUserImage] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [capture, setCapture] = useState(false);
  const webcamRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  function getUserImage(e) {
    setSelectedImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setUserImage(true);
  }

  const uploadImage = async () => {
    try {
      if (selectedImage) {
        const image = new FormData();
        image.append("file", selectedImage);
        image.append("cloud_name", "dpgbxk6w7");
        image.append("upload_preset", "odnin5hs");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpgbxk6w7/image/upload",
          {
            method: "POST",
            body: image,
          }
        );

        const imgData = await response.json();
        if (imgData && imgData.secure_url) {
          const imageUrl = imgData.secure_url;
          setImagePreview("");
          setSelectedImage(imageUrl);
          return imageUrl; // Return the image URL
        } else {
          throw new Error("Invalid response from Cloudinary");
        }
      } else {
        throw new Error("Invalid image format");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  function restImage() {
    setPostData({
      caption: "",
      image: "",
      userID: currentUser.id,
    });
    setSelectedImage("");
    setImagePreview("");
    setUserImage(false);
    setUserReady(false);
  }

  function userReadyToPost() {
    setUserImage(false);
    setUserReady(true);
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
    });
  };

  const addPostToDB = async (postData) => {
    try {
      const { caption, image, userID } = postData;
      await addPost({
        variables: {
          caption: caption.length > 0 ? caption : "",
          image: image.length > 0 ? image : "",
          userID: userID.length > 0 ? userID : "",
          avatar: currentUser.avatar.length > 0 ? currentUser.avatar : null,
          username:
            currentUser.username.length > 0 ? currentUser.username : null,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function submitPost() {
    try {
      setIsOpen(false);
      const imageUrl = await uploadImage(); // Wait for uploadImage to complete
      const updatedPostData = {
        ...postData,
        image: imageUrl,
      };
      await addPostToDB(updatedPostData); // Pass the updated state to addPostToDB
      setUserImage(false);
      setSelectedImage(""); // Reset selectedImage after upload
      setUserReady(false);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      // Handle errors if uploadImage or addPostToDB fails
    }
  }

  const captureFunc = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setSelectedImage(image);
    setCapture(false);
    setUserImage(true);
  }, [webcamRef]);

  return (
    <div className={darkMode? "add-post-container darkUI":"add-post-container"}>
      <div className="add-post-header">
        {(imagePreview || userReady) && <ImArrowLeft2 onClick={restImage} />}
        <h2>Create New Post</h2>
        {userImage ? (
          <p onClick={userReadyToPost}>Continue</p>
        ) : userReady ? (
          <button
            type="button"
            disabled={textCount ? false : true}
            onClick={submitPost}
          >
            Share
          </button>
        ) : (
          ""
        )}
      </div>
      {userImage ? (
        <div
          className="user-post-container"
          style={{
            backgroundImage: `url(${imagePreview || selectedImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "78.9vh",
            backgroundSize: "contain",
          }}
        ></div>
      ) : userReady ? (
        <div className="user-final-stage-container">
          <div
            className="user-final-stage-image"
            style={{
              backgroundImage: `url(${imagePreview || selectedImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          ></div>
          <div className="user-final-stage-caption">
            <div className="user-post-div">
              <img src={currentUser?.avatar ? currentUser?.avatar : avatar} />{" "}
              <p>{currentUser?.username}</p>{" "}
            </div>
            <textarea
              name="caption"
              id="captionId"
              cols="30"
              rows="10"
              maxLength={400}
              onChange={handlePostData}
              placeholder="Write a caption..."
              onInput={(e) => setTextCount(e.target.value)}
              style={{ backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black",}}
              required
            ></textarea>
            <p>{textCount.length}/400</p>
          </div>
        </div>
      ) : (
        <div className="post-default-container">
          {capture ? (
            <Webcam height={600} width={600} ref={webcamRef} />
          ) : (
            <>
              <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
              <h2>Select Photo Here</h2>
            </>
          )}
          {!capture && (
            <>
              <label htmlFor="img" className="custom-file-upload">
                Select from computer
              </label>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={getUserImage}
              />
            </>
          )}
          {capture && <button onClick={captureFunc}>Take picture</button>}
          <button id="camera-btn" onClick={() => setCapture(!capture)}>
            {capture ? "Go Back" : "Take Photo from device"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddPost;
