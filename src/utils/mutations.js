import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    insert_userData(
      objects: { email: $email, password: $password, userName: $username }
    ) {
      returning {
        avatar
        createdAt
        email
        id
        password
        userName
      }
    }
  }
`;



export const CHECK_USER = gql`
  query checkUser($email: String!, $password: String!) {
    userData(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      email
      password
    }
  }
`;