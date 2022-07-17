import Text from "../Text";
import format from "date-fns/format";
import Button from "../generic/Button";
import { View, StyleSheet, Alert } from "react-native";
import { DELETE_REVIEW } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
  },
  rowContainer: {
    padding: 20,
    backgroundColor: theme.colors.elementBackground,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 0,
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
  infoContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  nameText: {
    fontWeight: theme.fontWeights.bold,
  },
  goToRepositoryContainer: {
    backgroundColor: theme.colors.buttonColor,
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 15,
  },
  deleteReviewContainer: {
    backgroundColor: "#cf3434",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 15,
  },
  buttonText: {
    padding: 15,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.form,
  },
  buttonRow: {
    padding: 20,
    backgroundColor: theme.colors.elementBackground,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "space-around",
  },
});
const ReviewItem = ({ review, navigate, refetch }) => {
  const [deleteReviewWithId] = useMutation(DELETE_REVIEW);
  const goToRepository = () => {
    navigate(`/repositories/${review.repository.id}`);
  };

  const deleteReview = async () => {
    try {
      await deleteReviewWithId({ variables: { id: review.id } });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const removeReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        { text: "delete", onPress: () => deleteReview() },
      ]
    );
  };
  const creationDay = format(new Date(review.createdAt), "d.M.yyyy");
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{review.repository.fullName}</Text>
          <Text>{creationDay}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button
          onClick={goToRepository}
          buttonText="View repository"
          backgroundStyle={styles.goToRepositoryContainer}
          textStyle={styles.buttonText}
        />
        <Button
          onClick={removeReview}
          buttonText="delete review"
          backgroundStyle={styles.deleteReviewContainer}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default ReviewItem;
