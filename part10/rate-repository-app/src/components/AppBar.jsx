import { View, StyleSheet, ScrollView } from "react-native";
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
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        <AppBarTab tabText="Repositories" linkTo="/" />
        <AppBarTab tabText="Sign in" linkTo="/singin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
