import { createContext, useState, useContext} from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../utils/subscriptions";
import { ADD_COMMENT } from "../utils/mutations";
import { UserContext } from "./CurrentUser";

export const CommentsContext = createContext();

export default function CommentsContextProvider(props) {
  
  const { currentUser } = useContext(UserContext);
  const { data: commentData} = useSubscription(GET_COMMENTS);
  const [addComment] = useMutation(ADD_COMMENT);
  const commentTable = commentData?.userComments; 

  const addCommentToDB = async (userComment, commentedPost) => {
    try {
      const { avatar, id, username } = currentUser;
      //add the value of id to check the equal too
      await addComment({
        variables: {
          avatar: avatar.length > 0 ? avatar : null,
          comment: userComment.length > 0 ? userComment : null,
          postRef: commentedPost.length > 0? commentedPost : null,
          userID: id.length > 0? id : null,
          username: username.length > 0? username : null,
        },
      });
    } catch (error) {
      console.log("Error adding comment");
    }
  };

  return (
    <CommentsContext.Provider value={{commentTable, addCommentToDB}}>
      {props.children}
    </CommentsContext.Provider>
  );
}