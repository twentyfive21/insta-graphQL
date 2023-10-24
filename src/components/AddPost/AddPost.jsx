import { useState } from "react";
import "./AddPost.css";
import defaultImage from "../../assets/userpostdefualt.png";

function AddPost() {
  const [userImage, setUserImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  function getUserImage(e) {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Set the image URL for preview
    setUserImage(true);
  }

  return (
    <div className="add-post-container">
      <h2>Create New Post</h2>
      {userImage ? (
        <div className="user-post-container" style={{backgroundImage: `url(${selectedImage})`}}>
        </div>
      ) : (
        <div className="post-default-container">
          <img src={defaultImage} alt="Default" />
          <h2>Drag photos and videos here</h2>
          <label htmlFor="img" className="custom-file-upload">
            Select from computer
          </label>
          <input type="file" id="img" name="img" accept="image/*" onChange={getUserImage} />
        </div>
      )}
    </div>
  );
}

export default AddPost;
