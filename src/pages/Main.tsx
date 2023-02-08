import { Landing, Search, LikeList, RecentList } from "../components";

const Main = () => {
  return (
    <div className=" flex flex-col items-center ">
      <Landing />
      <Search />
      <LikeList />
      <RecentList />
    </div>
  );
};

export default Main;
