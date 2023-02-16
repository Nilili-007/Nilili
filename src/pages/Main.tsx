import {
  Landing,
  Path,
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
    </div>
  );
};

export default Main;
