import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import Modal from "react-modal";
import basic from "../../assets/login/Default.png";
import { useMutation } from "@apollo/client";
import { ADD_AVATAR } from "../../utils/mutations";
import { UserContext } from "../../contexts/CurrentUser";
import Webcam from "react-webcam";

import "./SetAvatar.css";

function SetAvatar({ userParam }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "24px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  };

  Modal.setAppElement(document.getElementById("root"));

  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [addAvatar] = useMutation(ADD_AVATAR);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageForUpload, setImageForUpload] = useState("");
  const [avatar, setAvatar] = useState(false);

  const { userData } = userParam || {};
  const { id: userId, avatar: userAvatar } = userData?.[0] || {};

  const handleSettingAvatar = () => {
    setIsOpen(false);
    setAvatar(true);
  };

  useEffect(() => {
    if (currentUser.avatar) {
      addAvatarToDB(currentUser);
    }
  }, [currentUser.avatar]);

  const [isCapture, setIsCapture] = useState(false);
  const [displayCapture, setDisplayCapture] = useState("");

  const webcamRef = useRef(null);
  const handleCapture = useCallback(
    (e) => {
      e.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();
      setDisplayCapture(imageSrc);
      setSelectedImage(imageSrc);
    },
    [webcamRef]
  );

  const handleImage = (e) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
    setImageForUpload(URL.createObjectURL(e.target.files[0]));
    console.log(selectedImage);
  };

  const uploadImage = async () => {
    try {
      if (
        selectedImage
        // selectedImage &&
        // (selectedImage.type === "image/png" ||
        //   selectedImage.type === "image/jpg" ||
        //   selectedImage.type === "image/jpeg")
      ) {
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
          console.log(imageUrl, "img urlll");
          // setImageForUpload(imageUrl);
          setIsOpen(false);
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

  const handleAvatar = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      setCurrentUser({
        ...currentUser,
        avatar: imageUrl,
      });

      setImageForUpload("");
      setDisplayCapture("");
      setAvatar(false);
      setIsOpen(false); // Close the modal with the file input
      addAvatarToDB(currentUser);
    } catch (error) {
      console.error("Error handling avatar:", error);
      // Handle the error, show an alert, etc.
    }
  };

  const addAvatarToDB = async (user) => {
    try {
      const { id, avatar } = user;
      //add the value of id to check the equal too
      await addAvatar({
        variables: {
          id: id,
          avatar: avatar.length > 0 ? avatar : "",
        },
      });
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };

  const finalModalClose = () => {
    setImageForUpload("");
    setSelectedImage("")
    setDisplayCapture("");
    setAvatar(false);
    setIsCapture(false);
  };

  return (
    <div>
      <img
        src={userAvatar ? userAvatar : basic}
        alt="profile image"
        className={
          userId === currentUser.id ? "profile-image" : "profile-image-non"
        }
        onClick={() => userId === currentUser.id && setIsOpen(true)}
      />
      <Modal
        isOpen={avatar}
        onRequestClose={finalModalClose}
        style={customStyles}
        contentLabel="setting avatar input"
      >
        <form className="avatar-form">
          {isCapture ? (
            <div className="webcam-container">
              {displayCapture ? (
                <img src={displayCapture} alt="Captured Image" />
              ) : (
                <Webcam height={600} width={600} ref={webcamRef} />
              )}
              <button onClick={(e) => handleCapture(e)}>Capture</button>
            </div>
          ) : imageForUpload ? (
            <img src={imageForUpload} alt="Selected Image" />
          ) :   <input
            placeholder="profile image link"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCapture(!isCapture);
              setDisplayCapture("");
            }}
          >
            {isCapture ? "Browse" : "Take from Camera"}
          </button>
          <button type="submit" onClick={handleAvatar}>Submit</button>
    <p className="cancel-link" onClick={finalModalClose}>Cancel</p>
        </form>
      </Modal>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="first-avatarModal">
          <p onClick={handleSettingAvatar}>Change Profile Picture</p>
          <p onClick={() => setIsOpen(false)}>Cancel</p>
        </section>
      </Modal>
    </div>
  );
}
export default SetAvatar;
