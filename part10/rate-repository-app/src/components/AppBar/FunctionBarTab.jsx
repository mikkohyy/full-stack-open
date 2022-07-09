import { StyleSheet, View, Pressable } from "react-native";
import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  textStyle: {
    fontSize: theme.fontSizes.tabItem,
    fontWeight: theme.fontWeights.bold,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const LogOutTab = ({ tabText, onPress }) => {
  return (
    <View>
      <Pressable style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.textStyle}>{tabText}</Text>
      </Pressable>
    </View>
  );
};

export default LogOutTab;
