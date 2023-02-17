import {
  Landing,
  Path,
  HashtagList,
  BeforeRecent,
  AfterLike,
} from "../components/main";

const Main = () => {
  return (
    <div className=" flex flex-wrap flex-col items-center ">
      <Landing />
      <Path />
      <BeforeRecent />
      <AfterLike />
      <HashtagList />
    </div>
  );
};

export default Main;
