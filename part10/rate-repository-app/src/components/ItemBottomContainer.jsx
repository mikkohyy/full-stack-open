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
      <ItemVolumeTextView volume={item.stargazersCount} text="Stars" />
      <ItemVolumeTextView volume={item.forksCount} text="Forks" />
      <ItemVolumeTextView volume={item.reviewCount} text="Reviews" />
      <ItemVolumeTextView volume={item.ratingAverage} text="Rating" />
    </View>
  );
};

export default ItemBottomContainer;
