import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignOut = (scrollViewRef) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate("/");
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    } catch (error) {
      console.log(error);
    }
  };

  return signOut;
};

export default useSignOut;
