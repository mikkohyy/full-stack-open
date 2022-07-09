import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async (username, password) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
