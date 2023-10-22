import { gql } from "@apollo/client";

export const CHECK_USER = gql`
  query checkUser($email: String!, $password: String!) {
    userData(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      avatar
      createdAt
      email
      id
      password
      username
    }
  }
`;
