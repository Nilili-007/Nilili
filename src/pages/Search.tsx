import { SearchLanding, SearchBox, SearchList } from "../components/search";

import { useEffect } from "react";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SearchLanding />
      <div className="flex flex-wrap flex-col items-center">
        <SearchBox />
        <SearchList />
      </div>
    </div>
  );
};

export default Search;
