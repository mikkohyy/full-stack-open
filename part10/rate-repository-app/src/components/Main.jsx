import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import CreateReviewView from "./CreateReviewView";
import SignUpView from "./SignUpView";
import UsersReviewsView from "./UsersReviewsView";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.basicBackground,
  },
  viewContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.viewContainer}>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUpView />} exact />
          <Route path="/my-reviews" element={<UsersReviewsView />} exact />
          <Route
            path="/repositories/:id"
            element={<SingleRepository />}
            exact
          />
          <Route path="/create-review" element={<CreateReviewView />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
