import { useState } from "react";
import "./AddPost.css";
import defaultImage from "../../assets/userpostdefualt.png";

function AddPost() {
  const [userImage, setUserImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  
  console.log(selectedImage);

  function getUserImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set the image URL for preview
      };

      reader.readAsDataURL(file);
    }

    setUserImage(true);
  }

  // Here you can send the selectedImage state variable to your database.

  return (
    <div className="add-post-container">
      <h2>Create New Post</h2>
      {userImage ? (
        <div className="user-post-container" style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '78.9vh',
          objectFit: 'cover'
        }}>
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
