import { View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "../FormikTextInput";
import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  fieldContentStyle: {
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    fontSize: theme.fontSizes.form,
  },
  formFieldStyle: {
    marginTop: 10,
  },
  formStyle: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.elementBackground,
    paddingBottom: 10,
  },
  buttonStyle: {
    backgroundColor: theme.colors.buttonColor,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    padding: 15,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.form,
  },
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formStyle}>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="ownerName"
          placeholder="Repository owner name"
          style={styles.fieldContentStyle}
        />
      </View>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="repositoryName"
          placeholder="Repository name"
          style={styles.fieldContentStyle}
        />
      </View>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="rating"
          placeholder="Rating between 0 and 100"
          style={styles.fieldContentStyle}
        />
      </View>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="text"
          placeholder="Review"
          style={styles.fieldContentStyle}
          multiline
        />
      </View>
      <Pressable style={styles.buttonStyle} onPress={onSubmit}>
        <Text style={styles.buttonText}>Add review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewForm;
