import { gql } from "@apollo/client";

export const GET_POSTS = gql`
subscription MySubscription {
  userPosts(order_by: {timestamp: desc}) {
    caption
    id
    image
    likes
    timestamp
    userID
  }
}
`

export const GET_ALL_USERS = gql`
subscription getAllUsers($id: uuid!) {
  userData(where: {id: {_eq: $id}}) {
    id
    avatar
    username
  }
}`