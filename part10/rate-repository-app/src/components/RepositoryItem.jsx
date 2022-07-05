import { View, StyleSheet } from "react-native";
import ItemTopContainer from "./ItemTopContainer";
import ItemBottomContainer from "./ItemBottomContainer";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemTopContainer item={item} />
      <ItemBottomContainer item={item} />
    </View>
  );
};

export default RepositoryItem;
