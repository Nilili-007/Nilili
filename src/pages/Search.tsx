import { SearchBox, SearchLanding, SearchList } from "../components";
import { useEffect } from "react";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SearchLanding />
      <div className="flex flex-wrap justify-center">
        <SearchBox />
        <SearchList />
      </div>
    </div>
  );
};

export default Search;
