import { gql } from '@apollo/client';

export const USER_DATA = gql`
  query {
    authenticatedUser {
      id
    }
  }
`;

export const USER_LOGIN = gql`
   mutation($email: String, $password: String) {
     authenticate: authenticateUserWithPassword(email: $email, password: $password) {
       token
       item {
         id
       }
     }
   }
`;

export const USER_LOGOUT = gql`
   mutation {
      unauthenticate: unauthenticateUser {
        success
     }
    }
`;