import { UserName, UserCategoryBtn } from "../components/user";

const User = () => {
  return (
    <div className="flex flex-wrap flex-col items-center">
      <UserName />
      <UserCategoryBtn />
    </div>
  );
};

export default User;
