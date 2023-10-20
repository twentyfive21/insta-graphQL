import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser(
     $email: String! 
     $password: String! 
     $username: String! 
    ) {
        insert_userData(
        objects: {
        email: $email 
        password: $password 
        userName: $username
        }
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