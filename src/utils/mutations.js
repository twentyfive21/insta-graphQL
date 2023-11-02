import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    insert_userData(
      objects: { email: $email, password: $password, username: $username }
    ) {
      returning {
        id
      }
    }
  }
`;

export const ADD_AVATAR = gql`
mutation changeAvatar($id: uuid!, $avatar: String!) {
  update_userData(
    where: { id: { _eq: $id } }
    _set: { avatar: $avatar }
  ) {
    returning {
      id
    }
  }
}
`;

export const ADD_POST = gql`
mutation addPost($caption: String!, $image: String!, $userID: uuid!, $avatar: String!, $username: String!) {
  insert_userPosts(
    objects: { caption: $caption, image: $image, userID: $userID, avatar: $avatar, username: $username}
    ) {
    returning {
      userID
    }
  }
}
`;


export const DELETE_POST = gql`
mutation deletePost($id: uuid!, $userID: uuid!) {
  delete_userPosts(
    where: {id: {_eq: $id}, userID: {_eq: $userID}}
    ) {
    returning {
      userID
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($avatar: String!, $comment: String!, $postRef: uuid!, $userID: uuid!, $username: String!) {
  insert_userComments(
    objects: {avatar: $avatar, comment: $comment, postRef: $postRef, userID: $userID, username: $username}) {
    returning {
      comment
    }
  }
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($postRef: uuid!, $userID: uuid! $id: uuid){
  delete_userComments(
    where: {postRef: {_eq: $postRef}, userID: {_eq: $userID}, id: {_eq: $id}}) {
    returning {
      comment
    }
  }
}
`;

export const DELETE_POST_COMMENTS = gql`
mutation deleteSelectedPostComments($postRef: uuid!) {
  delete_userComments(where: {postRef: {_eq: $postRef}}) {
    returning {
      postRef
    }
  }
}
`;