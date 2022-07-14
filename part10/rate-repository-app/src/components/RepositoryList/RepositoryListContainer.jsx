import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    backgroundColor: "lightgrey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ order, setOrder }) => {
  return (
    <Picker
      style={styles.pickerStyle}
      selectedValue={order}
      onValueChange={(itemValue) => setOrder(itemValue)}
      prompt="Select an item..."
    >
      <Picker.Item label="Latest repositories" value="latest"></Picker.Item>
      <Picker.Item
        label="Highest rated repositories"
        value="highestRated"
      ></Picker.Item>
      <Picker.Item
        label="Lowest rated repositories"
        value="lowestRated"
      ></Picker.Item>
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={<OrderPicker order={order} setOrder={setOrder} />}
      stickyHeaderIndices={[0]}
    />
  );
};

export default RepositoryListContainer;
