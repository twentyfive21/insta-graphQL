import React, { useContext } from "react";
import "./Post.css";
import Comment from "../Comment/Comment";
import Actions from "../Actions/Actions";
import Collab from "../Collab/Collab";
import { CommentsContext } from "../../contexts/CommentData";

function Post({ userData, userLike }) {
  const { commentTable } = useContext(CommentsContext);

  const filteredComments = commentTable?.filter(
    (comment) => comment?.postRef === userData?.id
  );

  return (
    <div className="main-box">
      <section className="next-img">
        <img
          src={userData?.image}
          alt={userData?.userName}
          className="post-main-image"
        />
      </section>
      <section>
        <Collab userData={userData} />
        <section className="all-comments-container scrollable-comments">
          {filteredComments?.map((item) => {
            return <Comment userData={item} key={item?.id} />;
          })}
        </section>
        <Actions
          postID={userData?.id}
          userLike={userLike}
          userData={userData}
        />
      </section>
    </div>
  );
}

export default Post;

