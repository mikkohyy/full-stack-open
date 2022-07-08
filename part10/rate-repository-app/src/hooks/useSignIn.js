import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async (username, password) => {
    const { data } = await mutate({ variables: { username, password } });
    console.log(data);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
