import { React, useState } from "react";
import "./Posts.css";
import dotDark from "../../assets/posts/dotDark.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import comment from "../../assets/posts/comment.png";
import smile from "../../assets/posts/smile.png";
import blueCheck from "../../assets/posts/blue.png";
import { GET_ALL_USERS } from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";
import Avatar from "../../assets/login/Default.png"

function Posts({ item }) {
  const { data, loading, error } = useSubscription(GET_ALL_USERS, {
    variables: { id: item.userID },
  });

  console.log(data?.userData[0])
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = e.target.elements.comment.value;
    setComments((prev) => [...prev, newComment]);
  };
  return (
    <div className="single-insta-post">
      <div className="username-insta-section">
        <div className="user-insta-left">
          <img src={data?.userData[0]?.avatar ? data?.userData[0]?.avatar :Avatar} alt={data?.userData[0]?.avatar} />
          <p>{data?.userData[0]?.username}</p>
        </div>
        <img src={dotDark} alt="dots" />
      </div>
      <div className="user-insta-img">
        <img src={item.image} alt={item.caption} />
      </div>
      <div className="interact-insta-section">
        <div className="interact-insta-left">
          <button onClick={() => setLike(!like)}>
            {like ? (
              <AiFillHeart className="like-filled like-btn" />
            ) : (
              <AiOutlineHeart className="like-btn" />
            )}
          </button>
          <button>
            <img src={comment} />
          </button>
        </div>
      </div>
      <div className="comment-insta-container">
        <p className="comment-insta-likes">{item.likes} likes</p>
        <p className="caption-insta">
         {data?.userData[0]?.username} <span>{item.caption}</span>
        </p>
        <p className="comment-count-insta">View all 13,384 comments</p>
        {comments.map((comment) => (
          <p key={comment} className="added-comment-insta">
            <span className="comment-user">tinawinnn :</span>
            <span className="comment-text">{comment}</span>
          </p>
        ))}
        <div className="comment-section-insta">
          <form onSubmit={handleSubmit}>
            <input
              name="comment"
              placeholder="Add a comment…"
              className="add-comment"
            />
          </form>
          <img src={smile} alt="smile" />
        </div>
      </div>
    </div>
  );
}

export default Posts;
