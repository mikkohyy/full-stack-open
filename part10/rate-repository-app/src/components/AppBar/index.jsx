import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import LinkBarTab from "./LinkBarTab";
import FunctionBarTab from "./FunctionBarTab";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import useSignOut from "../../hooks/useSignOut";

import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barColor,
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingRight: 15,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const signOut = useSignOut();

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <LinkBarTab tabText="Repositories" linkTo="/" />
        {data.me && (
          <LinkBarTab tabText="Create a review" linkTo="/create-review" />
        )}
        {!data.me && <LinkBarTab tabText="Sign in" linkTo="/signin" />}
        {!data.me && <LinkBarTab tabText="Sing up" linkTo="/signup" />}
        {data.me && <LinkBarTab tabText="My reviews" linkTo="/my-reviews" />}
        {data.me && <FunctionBarTab tabText="Sing out" onPress={signOut} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
