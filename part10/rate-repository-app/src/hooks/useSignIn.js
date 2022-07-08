import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async (username, password) => {
    await mutate({ variables: { username, password } });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
