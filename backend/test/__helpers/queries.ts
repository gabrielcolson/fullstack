import { gql } from 'apollo-server-express';

export const REGISTER = gql`
    mutation register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            email
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            email
        }
    }
`;

export const LOGOUT = gql`
  mutation {
      logout {
          email
      }
  }
`;

export const ME = gql`
    {
        me {
            id
            email
        }
    }
`;
