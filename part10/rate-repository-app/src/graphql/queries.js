import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS, REVIEW } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...CoreRepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              id
              fullName
            }
            ...Review
          }
        }
      }
    }
  }
  ${REVIEW}
`;

export const GET_REPOSITORY = gql`
  query findRepositoryById($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...Review
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${CORE_REPOSITORY_FIELDS}
  ${REVIEW}
`;
