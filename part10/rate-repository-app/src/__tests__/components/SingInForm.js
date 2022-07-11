import SignInForm from "../../components/SignInForm";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Formik } from "formik";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const initialValues = {
        username: "",
        password: "",
      };

      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "test-user");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "test-user",
          password: "password",
        });
      });
    });
  });
});
