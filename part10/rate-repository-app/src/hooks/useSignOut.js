import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.log(error);
    }
  };

  return signOut;
};

export default useSignOut;
