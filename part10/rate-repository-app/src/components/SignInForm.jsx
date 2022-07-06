import { Text, View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";

const styles = StyleSheet.create({
  loginFieldContentStyle: {
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    fontSize: theme.fontSizes.form,
  },
  loginFieldStyle: {
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formStyle}>
      <View style={styles.loginFieldStyle}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          style={styles.loginFieldContentStyle}
        />
      </View>
      <View style={styles.loginFieldStyle}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          style={styles.loginFieldContentStyle}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.buttonStyle} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
