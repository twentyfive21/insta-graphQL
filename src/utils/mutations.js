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
mutation addPost($caption: String!, $image: String!, $userID: uuid!) {
  insert_userPosts(
    objects: { caption: $caption, image: $image, userID: $userID}
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
