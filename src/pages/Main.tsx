import {
  Landing,
  Path,
  CityList,
  RecentList,
  RandomList,
  HashtagList,
} from "../components/main";

const Main = () => {
  return (
    <div className=" flex flex-wrap flex-col items-center ">
      <Landing />
      <Path />
      <CityList />

      <RecentList />
      <RandomList />
      <HashtagList />
    </div>
  );
};

export default Main;
