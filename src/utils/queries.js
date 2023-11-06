import { gql } from "@apollo/client";

export const CHECK_USER = gql`
  query checkUser($email: String!, $password: String!) {
    userData(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      avatar
      email
      id
      password
      username
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query GetComments {
    userComments(order_by: { createdAt: desc }) {
      avatar
      comment
      username
      id
      userID
      postRef
    }
  }
`;
