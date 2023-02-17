import { UserNameEdit, UserCategoryBtn } from "../components/user";

const User = () => {
  return (
    <div className="flex flex-wrap flex-col items-center">
      <UserNameEdit />
      <UserCategoryBtn />
    </div>
  );
};

export default User;
