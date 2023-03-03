import { UserName, UserCategoryBtn } from "../components/user";
import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

const User = () => {
  useEffect(() => {
    amplitude.track("유저페이지 접속");
  }, []);
  return (
    <div className="flex flex-wrap flex-col items-center">
      <UserName />
      <UserCategoryBtn />
    </div>
  );
};

export default User;
