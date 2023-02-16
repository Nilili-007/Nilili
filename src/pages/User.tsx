import { UserName, UserCategoryBtn, UserList } from "../components/user";

const User = () => {
  return (
    <div className="flex flex-wrap flex-col items-center">
      <UserName />
      <UserCategoryBtn />
      <UserList />
    </div>
  );
};

export default User;
