import { FlatList, View, StyleSheet } from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    backgroundColor: "lightgrey",
  },
  headerStyle: {
    flexGrow: 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySearchField = ({ searchText, setSearchText }) => {
  const onChange = (query) => {
    setSearchText(query);
  };

  return (
    <Searchbar
      placeholder="Search.."
      onChangeText={onChange}
      value={searchText}
    />
  );
};

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

const RepositoryListHeader = ({
  order,
  setOrder,
  searchText,
  setSearchText,
}) => {
  return (
    <View>
      <OrderPicker order={order} setOrder={setOrder} />
      <RepositorySearchField
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </View>
  );
};

export const RepositoryListContainerFunctional = ({
  repositories,
  order,
  setOrder,
  searchText,
  setSearchText,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          order={order}
          setOrder={setOrder}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
      stickyHeaderIndices={[0]}
    />
  );
};

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        order={props.order}
        setOrder={props.setOrder}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
    );
  };

  getRepositoryNodes = () => {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];
    return repositoryNodes;
  };

  render() {
    return (
      <FlatList
        data={this.getRepositoryNodes()}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
      />
    );
  }
}

export default RepositoryListContainer;
