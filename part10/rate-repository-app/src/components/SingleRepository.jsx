import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { View } from "react-native";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryList/RepositoryItem";

const SingleRepository = () => {
  const id = useParams().id;

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    return null;
  }

  return (
    <View>
      <RepositoryItem item={data.repository} />
    </View>
  );
};

export default SingleRepository;
