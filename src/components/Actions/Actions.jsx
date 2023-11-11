import { useState, useContext } from "react";
import "./Actions.css";
import smile from "../../assets/posts/smile.png";
import { CommentsContext } from "../../contexts/CommentData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../contexts/CurrentUser";
import { LikesContext } from "../../contexts/LikesContext";

function Actions({ postID, userLike, userData }) {
  const { addCommentToDB } = useContext(CommentsContext);
  const { addLikeToDB, removeLikeFromDB } = useContext(LikesContext);
  const [commentValue, setCommentValue] = useState("");
  const { currentUser, darkMode } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentToDB(commentValue, postID);
    setCommentValue("");
  };

  const userLikesFilter = userLike?.filter((item) => {
    return item?.postRef === postID;
  });

  const combinedUserLikesFilter = [].concat(...userLikesFilter);

  const finalFilterOfUserLikes = combinedUserLikesFilter.filter((item) => {
    return item?.userID === currentUser?.id;
  });

  // Parse the specific date string into a Date object
  const specificDate = new Date(userData?.timestamp);

  // Get today's date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - specificDate;

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div className={darkMode? "actions-container darkUI" : "actions-container"}>
        <div className="act-spacing">
          {finalFilterOfUserLikes[0]?.userID === currentUser?.id ? (
            <AiFillHeart
              onClick={() => removeLikeFromDB(postID)}
              className="like-filled like-btn"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => addLikeToDB(postID)}
              className="like-btn"
            />
          )}
        <svg aria-label="Comment" height="24" role="img" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"  stroke-width="2"></path>
        </svg>
      </div>
      </div>
      <div className="action-data">
        {userLikesFilter?.length === 1
          ? `${userLikesFilter?.length} like`
          : userLikesFilter?.length > 1
          ? `${userLikesFilter?.length} likes`
          : `${userLikesFilter?.length} likes`}
        <p className="lighter-info">
          {daysDifference === 0
            ? "Posted Today"
            : daysDifference > 1
            ? `${daysDifference} Days Ago`
            : `${daysDifference} Day Ago`}
        </p>
        <p>{userData?.caption}</p>
      </div>
      <div className="ac-box">
          <img src={smile} alt="smile" />
          <form onSubmit={handleSubmit}>
            <input
              name="comment"
              placeholder="Add a comment…"
              className="add-comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </form>
          <button className="post">Post</button>
      </div>
    </div>
  );
}

export default Actions;
