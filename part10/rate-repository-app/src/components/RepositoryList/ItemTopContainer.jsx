import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 0,
    paddingBottom: 10,
  },
  infoContainer: {
    flexShrink: 1,
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  imageContainer: {
    flexGrow: 0,
    paddingRight: 20,
  },
  nameText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  descriptionText: {
    color: theme.colors.textSecondary,
  },
  descriptionTextContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  languageItemText: {
    color: theme.colors.languageText,
  },
  languageItemContainer: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: theme.colors.languageBackground,
  },
});

const ItemTopContainer = ({ item }) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.authorImage}
          source={{ uri: item.ownerAvatarUrl }}
        />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text testID="authorName" style={styles.nameText}>
            {item.fullName}
          </Text>
        </View>
        <View testID="description" style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={styles.languageItemContainer}>
          <Text testID="language" style={styles.languageItemText}>
            {item.language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemTopContainer;
