import SignInForm from "./SignInForm";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const singInValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Too short username (min 3 characters)")
    .max(12, "Too long username (max 12 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Too short password (min 4 characters)")
    .max(12, "Too long password (max 12 characters)")
    .required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={singInValidationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
