import {
  Landing,
  Path,
  CityList,
  RecentList,
  RandomList,
} from "../components/main";

const Main = () => {
  return (
    <div className=" flex flex-wrap flex-col items-center ">
      <Landing />
      <Path />
      <CityList />
      <RecentList />
      <RandomList />
    </div>
  );
};

export default Main;
