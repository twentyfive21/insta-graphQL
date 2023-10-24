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