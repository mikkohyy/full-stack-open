import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
