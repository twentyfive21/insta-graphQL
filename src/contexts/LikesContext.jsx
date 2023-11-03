import { createContext, useContext, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_LIKES } from "../utils/subscriptions";
import { SET_LIKE } from "../utils/mutations";
import { UserContext } from "./CurrentUser";
import { REMOVE_LIKE } from "../utils/mutations";
import { DELETE_POST_LIKES } from "../utils/mutations";

export const LikesContext = createContext();

export default function LikesContextProvider(props) {

    const { currentUser } = useContext(UserContext);
    const { data : likesData } = useSubscription(GET_LIKES);
    const allLikes = likesData?.userLikes;
    const [removeLike] = useMutation(REMOVE_LIKE);
    const [setLike] = useMutation(SET_LIKE);
    const [deleteAllSelectedLikes] = useMutation(DELETE_POST_LIKES);

const addLikeToDB = async (post) => {
    try {
      await setLike({
        variables: {
          postRef: post.length > 0 ? post : null,
          userID: currentUser.id.length > 0 ?  currentUser.id : null,
        },
      });
    } catch (error) {
      console.log("Error adding like");
    }
  };

  const removeLikeFromDB = async (post) => {
    try {
      await removeLike({
        variables: {
          postRef: post.length > 0 ? post : null,
          userID: currentUser.id.length > 0 ?  currentUser.id : null,
        },
      });
    } catch (error) {
      console.log("Error removing like");
    }
  };
  

  return (
    <LikesContext.Provider value={{ allLikes, addLikeToDB, removeLikeFromDB }}>
      {props.children}
    </LikesContext.Provider>
  );
}