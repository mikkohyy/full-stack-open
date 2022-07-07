import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
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
