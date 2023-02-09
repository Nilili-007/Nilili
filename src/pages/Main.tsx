import { Landing, RandomList, RecentList, CityList, Path } from "../components";

const Main = () => {
  return (
    <div className=" flex flex-col items-center ">
      <Landing />
      <Path />
      <CityList />
      <RecentList />
      <RandomList />
    </div>
  );
};

export default Main;
