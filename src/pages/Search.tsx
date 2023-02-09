import { SearchBox, SearchLanding, SearchList } from "../components";
const Search = () => {
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
