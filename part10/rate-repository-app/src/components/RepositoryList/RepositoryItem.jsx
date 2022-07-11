import { View, StyleSheet, Pressable, Text } from "react-native";
import ItemTopContainer from "./ItemTopContainer";
import ItemBottomContainer from "./ItemBottomContainer";
import { useNavigate } from "react-router-native";
import { openURL } from "expo-linking";

import theme from "../../theme";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.elementBackground,
  },
  githubButtonText: {
    color: theme.colors.languageText,
    padding: 10,
    fontWeight: theme.fontWeights.bold,
  },
  githubButtonContainer: {
    borderRadius: 6,
    backgroundColor: theme.colors.languageBackground,
    alignItems: "center",
    marginTop: 10,
    zIndex: 1,
  },
});

const GithubButton = ({ url }) => {
  const onPress = () => {
    openURL(url);
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.githubButtonContainer}>
        <Text testID="language" style={styles.githubButtonText}>
          Open in GitHub
        </Text>
      </View>
    </Pressable>
  );
};

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  const onPress = () => {
    navigate(`/repositories/${item.id}`);
  };
  return (
    <Pressable onPress={onPress}>
      <View testID="repositoryItem" style={styles.container}>
        <ItemTopContainer item={item} />
        <ItemBottomContainer item={item} />
        {item.url && <GithubButton url={item.url} />}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
