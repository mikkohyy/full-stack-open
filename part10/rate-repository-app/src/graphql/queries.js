import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS, REVIEW } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
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

export const GET_REPOSITORY = gql`
  query findRepositoryById($id: ID!) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews {
        edges {
          node {
            ...Review
          }
        }
      }
    }
  }
  ${CORE_REPOSITORY_FIELDS}
  ${REVIEW}
`;
