import { gql } from "@apollo/client";

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
  }
`;

export const REVIEW = gql`
  fragment Review on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
