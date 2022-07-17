import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import format from "date-fns/format";
import Text from "../Text";

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
  mainContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  reviewsContainer: {
    flexShrink: 1,
    flexGrow: 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const creationDay = format(new Date(review.createdAt), "d.M.yyyy");
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{review.user.username}</Text>
        <Text>{creationDay}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ReviewList = ({ repository, fetchMore }) => {
  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const id = useParams().id;

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 4 },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.log(error);
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: { id, after: data.repository.reviews.pageInfo.endCursor },
    });
  };

  if (loading) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <RepositoryItem item={data.repository} />
      <ItemSeparator />
      <View style={styles.reviewsContainer}>
        <ReviewList repository={data.repository} fetchMore={handleFetchMore} />
      </View>
    </View>
  );
};

export default SingleRepository;
