import { Formik } from "formik";
import SignUpForm from "./SignUpForm";
import * as yup from "yup";
import { SIGN_UP } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username length must be between 1 to 30")
    .max(30, "Username length be between 1 to 30"),
  password: yup
    .string()
    .typeError("Password must be a string")
    .required("Password is required")
    .min(5, "Password length must be between 5 to 50")
    .max(50, "Password length be between 5 to 5"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirmation must match password")
    .required("Password confirmation is required"),
});

const SignUpView = () => {
  const [signUp] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
      };
      await signUp({ variables: { user: newUser } });
      await signIn(values.username, values.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpView;
