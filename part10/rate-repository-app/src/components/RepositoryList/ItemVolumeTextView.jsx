import Text from "../Text";
import { View, StyleSheet } from "react-native";

import theme from "../../theme";

const styles = StyleSheet.create({
  volume: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  text: {
    color: theme.colors.textSecondary,
  },
  container: {
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
  },
});

const getVolumeString = (volume) => {
  let volumeValue = volume;

  if (volume >= 1000) {
    const newVolume = (volumeValue / 1000).toFixed(1);
    volumeValue = `${newVolume}k`;
  }

  return volumeValue;
};

const ItemVolumeTextView = ({ text, volume, testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.volume}>{getVolumeString(volume)}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ItemVolumeTextView;
