import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barColor,
    paddingLeft: 20,
    height: 100,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabText="Repositories" />
    </View>
  );
};

export default AppBar;
