import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../../hooks/useRepositories";
import { useState } from "react";

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchText, setSearchText] = useState("");
  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};

export default RepositoryList;
