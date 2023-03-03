import {
  Landing,
  Path,
  HashtagList,
  BeforeRecent,
  AfterLike,
} from "../components/main";
import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";
const Main = () => {
  useEffect(() => {
    amplitude.track("메인페이지 접속");
  }, []);
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
