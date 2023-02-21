import { SearchLanding, SearchBox } from "../components/search";
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
      </div>
    </div>
  );
};

export default Search;
