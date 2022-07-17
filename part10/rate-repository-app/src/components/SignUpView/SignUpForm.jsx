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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formStyle}>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          style={styles.fieldContentStyle}
        />
      </View>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          style={styles.fieldContentStyle}
          secureTextEntry
        />
      </View>
      <View style={styles.formFieldStyle}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation "
          style={styles.fieldContentStyle}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.buttonStyle} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
