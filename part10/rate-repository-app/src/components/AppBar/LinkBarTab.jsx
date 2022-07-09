import { StyleSheet, View } from "react-native";
import Text from "../Text";
import { Link } from "react-router-native";

import theme from "../../theme";

const styles = StyleSheet.create({
  tabText: {
    fontSize: theme.fontSizes.tabItem,
    fontWeight: theme.fontWeights.bold,
    paddingLeft: 20,
    paddingBottom: 20,
  },
});

const AppBarTab = ({ tabText, linkTo }) => {
  return (
    <View>
      <Link
        activeOpacity={0.6}
        underlayColor={theme.colors.barColor}
        to={linkTo}
      >
        <Text style={styles.tabText}>{tabText}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
