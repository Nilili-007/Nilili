import { Landing, SearchBox, LikeList, RecentList } from "../components";

const Main = () => {
  return (
    <div className=" flex flex-col items-center ">
      <Landing />
      <SearchBox />
      <LikeList />
      <RecentList />
    </div>
  );
};

export default Main;
