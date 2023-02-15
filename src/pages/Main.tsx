import {
  Landing,
  Path,
  CityList,
  RecentList,
  RandomList,
  HashtagList,
  BeforeRecent,
  AfterLike,
  AfterRecent,
} from "../components/main";

const Main = () => {
  return (
    <div className=" flex flex-wrap flex-col items-center ">
      <Landing />
      <Path />
      <BeforeRecent />
      <AfterLike />
      <AfterRecent />
      <HashtagList />
      <CityList />
      <RecentList />
      <RandomList />
    </div>
  );
};

export default Main;
