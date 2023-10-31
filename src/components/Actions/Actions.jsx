import { useState, useContext } from "react";
import "./Actions.css";
import comment from "../../assets/comment.png";
import bookmark from "../../assets/bookmark.png";
import smile from "../../assets/smile.png";
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

  const userLikesFilter = userLike.filter((item) => {
    return item.postRef === postID;
  });

  const combinedUserLikesFilter = [].concat(...userLikesFilter);

  const finalFilterOfUserLikes = combinedUserLikesFilter.filter((item) => {
    return item.userID === currentUser.id;
  });

  return (
    <div className="all-actions-main">
      <div className="actions-container">
        <div className="act-spacing">
          {finalFilterOfUserLikes[0]?.userID === currentUser.id ? (
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
        {userLikesFilter.length === 1
          ? `${userLikesFilter.length} like`
          : userLikesFilter.length > 1
          ? `${userLikesFilter.length} likes`
          : `${userLikesFilter.length} likes`}
        <p className="lighter-info">3 DAYS AGO</p>
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
