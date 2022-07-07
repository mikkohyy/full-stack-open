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
