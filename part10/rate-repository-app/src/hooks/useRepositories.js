import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const getOrderVariables = (order) => {
  let orderVariables = {};

  if (order === "latest") {
    orderVariables = { orderDirection: "DESC", orderBy: "CREATED_AT" };
  } else if (order === "highestRated") {
    orderVariables = { orderDirection: "DESC", orderBy: "RATING_AVERAGE" };
  } else if (order === "lowestRated") {
    orderVariables = { orderDirection: "ASC", orderBy: "RATING_AVERAGE" };
  }

  return orderVariables;
};

const useRepositories = (order) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: getOrderVariables(order),
  });

  if (error) {
    console.log(error);
  }

  return {
    repositories: loading ? { edges: [] } : { ...data.repositories },
    loading,
  };
  // Removed refetch: fetchRepositories since I think that when adding new repos, I will be
  // using graphql's refecthing in the mutations..
};

export default useRepositories;
