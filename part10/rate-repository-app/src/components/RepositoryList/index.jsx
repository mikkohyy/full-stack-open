import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../../hooks/useRepositories";
import { useState } from "react";

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
