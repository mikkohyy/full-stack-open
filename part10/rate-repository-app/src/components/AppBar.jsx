import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barColor,
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabText="Repositories" linkTo="/" />
      <AppBarTab tabText="Sign in" linkTo="/singin" />
    </View>
  );
};

export default AppBar;
