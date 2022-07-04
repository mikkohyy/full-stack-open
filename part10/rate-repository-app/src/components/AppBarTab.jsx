import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  tabText: {
    fontSize: theme.fontSizes.tabItem,
    fontWeight: theme.fontWeights.bold,
    paddingTop: 50,
  },
});

const AppBarTab = ({ tabText }) => {
  return (
    <Pressable>
      <Text style={styles.tabText}>{tabText}</Text>
    </Pressable>
  );
};

export default AppBarTab;
