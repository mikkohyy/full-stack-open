import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getUsersReviews = (data) => {
  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return reviews;
};

const UsersReviewsView = () => {
  const navigate = useNavigate();
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  if (error) {
    console.log(error);
  }

  if (!data?.me) {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={getUsersReviews(data)}
      renderItem={({ item }) => (
        <ReviewItem review={item} navigate={navigate} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UsersReviewsView;
