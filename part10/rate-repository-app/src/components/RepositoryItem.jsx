import { Text } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <Text>
      Full name: {item.fullName}
      {"\n"}
      Description: {item.description}
      {"\n"}
      Language: {item.language}
      {"\n"}
      Stars: {item.starsgazersCount}
      {"\n"}
      Forks: {item.forksCount}
      {"\n"}
      Reviews: {item.reviewCount}
      {"\n"}
      Rating: {item.ratingAverage}
    </Text>
  );
};

export default RepositoryItem;
