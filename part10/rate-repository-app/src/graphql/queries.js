import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
  ${CORE_REPOSITORY_FIELDS}
`;

export const SIGN_IN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
