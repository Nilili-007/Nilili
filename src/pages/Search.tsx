import { SearchLanding, SearchBox } from "../components/search";
import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    amplitude.track("검색페이지 접속");
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
