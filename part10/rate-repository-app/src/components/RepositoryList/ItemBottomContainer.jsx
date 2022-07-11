import { View, StyleSheet } from "react-native";
import ItemVolumeTextView from "./ItemVolumeTextView";

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 0,
  },
});

const ItemBottomContainer = ({ item }) => {
  return (
    <View style={styles.bottomContainer}>
      <ItemVolumeTextView
        testID="stargazersCount"
        volume={item.stargazersCount}
        text="Stars"
      />
      <ItemVolumeTextView
        testID="forksCount"
        volume={item.forksCount}
        text="Forks"
      />
      <ItemVolumeTextView
        testID="reviewCount"
        volume={item.reviewCount}
        text="Reviews"
      />
      <ItemVolumeTextView
        testID="ratingAverage"
        volume={item.ratingAverage}
        text="Rating"
      />
    </View>
  );
};

export default ItemBottomContainer;
