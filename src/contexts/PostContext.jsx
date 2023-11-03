import { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_POST_COMMENTS } from "../utils/mutations";
import { DELETE_POST } from "../utils/mutations";
import { DELETE_POST_LIKES } from "../utils/mutations";

export const PostContext = createContext();

export default function PostContextProvider(props) {

const [deletePost] = useMutation(DELETE_POST);
const [deleteAllPostComments] = useMutation(DELETE_POST_COMMENTS);
const [deleteAllSelectedLikes] = useMutation(DELETE_POST_LIKES);
const [settingsModal, setSettingsModal] = useState(false);
// state for post to be deleted 
const [deletedPost, setDeletedPost] = useState({});


const deleteAllCommentsFromDB = async () => {
    try {
      await deleteAllPostComments({
        variables: {
          postRef: deletedPost.id.length > 0 ? deletedPost.id : null,
        },
      });
    } catch (error) {
      console.log("Error deleting all comments for post");
    }
  };

  const deletePostFromDB = async () => {
    try {
      //add the value of id to check the equal too
      await deletePost({
        variables: {
          id: deletedPost.id,
          userID: deletedPost.userID.length > 0 ? deletedPost.userID : null,
        },
      });
    } catch (error) {
      console.log("Error deleting post");
    }
  };


  const deleteAllPhotoLikes = async (post) => {
    try {
      await deleteAllSelectedLikes({
        variables: {
          postRef: deletedPost.id.length > 0 ? deletedPost.id : null,
        },
      });
    } catch (error) {
      console.log("Error deleting all likes");
    }
  };

  return (
    <PostContext.Provider value={{ deleteAllCommentsFromDB, deletedPost, setDeletedPost, deletePostFromDB, settingsModal, setSettingsModal, deleteAllPhotoLikes}}>
      {props.children}
    </PostContext.Provider>
  );
}