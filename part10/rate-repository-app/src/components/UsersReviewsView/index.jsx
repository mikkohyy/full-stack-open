import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "../Text";
import format from "date-fns/format";

import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: theme.colors.elementBackground,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 0,
  },
  nameText: {
    fontWeight: theme.fontWeights.bold,
  },
  infoContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  ratingContainer: {
    borderColor: theme.colors.languageBackground,
    borderWidth: 2,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  ratingText: {
    color: theme.colors.languageBackground,
    fontSize: theme.fontSizes.score,
  },
});

const ReviewItem = ({ review }) => {
  const creationDay = format(new Date(review.createdAt), "d.M.yyyy");
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{review.repository.fullName}</Text>
        <Text>{creationDay}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const getUsersReviews = (data) => {
  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return reviews;
};

const UsersReviewsView = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={getUsersReviews(data)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UsersReviewsView;
