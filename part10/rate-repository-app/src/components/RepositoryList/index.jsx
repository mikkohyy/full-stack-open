import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../../hooks/useRepositories";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const { repositories } = useRepositories(order, debouncedSearchText);

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
