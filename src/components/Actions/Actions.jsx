import { useState, useContext } from "react";
import "./Actions.css";
import comment from '../../assets/posts/comment.png'
import bookmark from "../../assets/posts/bookmark.png";
import smile from "../../assets/posts/smile.png";
import { CommentsContext } from "../../contexts/CommentData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../contexts/CurrentUser";
import { LikesContext } from "../../contexts/LikesContext";

function Actions({ postID, userLike, userData }) {
  const { addCommentToDB } = useContext(CommentsContext);
  const { addLikeToDB, removeLikeFromDB } = useContext(LikesContext);
  const [commentValue, setCommentValue] = useState("");
  const { currentUser } = useContext(UserContext);

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
    <div className="all-actions-main">
      <div className="actions-container">
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
          <img src={comment} alt="comment" />
        </div>
        <img src={bookmark} alt="bookmark" />
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
        <div className="ac-innerbox">
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
    </div>
  );
}

export default Actions;
