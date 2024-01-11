import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  subscription MySubscription {
    userPosts(order_by: { timestamp: desc }) {
      caption
      id
      image
      timestamp
      userID
      username
      avatar
    }
  }
`;

export const GET_ALL_USER_POSTS = gql`
  subscription MySubscription {
    userPosts(order_by: { timestamp: desc }) {
      caption
      id
      image
      timestamp
      userID
      avatar
      username
    }
  }
`;

export const GET_ALL_USERS = gql`
  subscription getAllUsers($id: uuid!) {
    userData(where: { id: { _eq: $id } }) {
      id
      avatar
      username
    }
  }
`;

export const GET_ALL_USERS_SIDE_BAR = gql`
  subscription {
    userData(limit: 6, order_by: { createdAt: asc }) {
      id
      avatar
      username
      createdAt
    }
  }
`;

export const GET_COMMENTS = gql`
  subscription MySubscription {
    userComments(order_by: { createdAt: asc }) {
      avatar
      comment
      username
      id
      userID
      postRef
      createdAt
    }
  }
`;
export const GET_LIKES = gql`
  subscription MySubscription {
    userLikes(order_by: {}) {
      isLiked
      postRef
      userID
    }
  }
`;
