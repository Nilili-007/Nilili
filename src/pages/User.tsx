import { UserNameEdit, UserCategoryBtn, UserList } from "../components/user";

const User = () => {
  return (
    <div className="flex flex-wrap flex-col items-center">
      <UserNameEdit />
      <UserCategoryBtn />
      <UserList />
    </div>
  );
};

export default User;
