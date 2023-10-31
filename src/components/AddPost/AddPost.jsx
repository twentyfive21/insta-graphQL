import { useState, useContext, useRef, useCallback } from "react";
import "./AddPost.css";
import avatar from "../../assets/login/Default.png";
import defaultImage from "../../assets/userpostdefualt.png";
import { ImArrowLeft2 } from "react-icons/im";
import { UserContext } from "../../contexts/CurrentUser";
import { ADD_POST } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import Webcam from "react-webcam";

function AddPost() {
  const { currentUser, setIsOpen } = useContext(UserContext);
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
    <div className="add-post-container">
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
              <img src={defaultImage} alt="Default" />
              <h2>Drag photos and videos here</h2>
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
