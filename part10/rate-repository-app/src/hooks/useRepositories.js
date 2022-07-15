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

const useRepositories = (fetchN, order, searchText) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...getOrderVariables(order),
      searchKeyword: searchText,
      first: fetchN,
    },
  });

  if (error) {
    console.log(error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...getOrderVariables(order),
        searchKeyword: searchText,
      },
    });
  };

  return {
    repositories: loading ? { edges: [] } : { ...data.repositories },
    fetchMore: handleFetchMore,
    loading,
  };
  // Removed refetch: fetchRepositories since I think that when adding new repos, I will be
  // using graphql's refecthing in the mutations..
};

export default useRepositories;
