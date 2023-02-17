import { useState } from "react";
import UserList from "./UserList";
import Select from "react-select";

const isDoneOptions = [
  { value: false, label: "여행 전" },
  { value: true, label: "여행 후" },
];

const UserCategoryBtn = () => {
  const [category, setCategory] = useState("MY");
  const [done, setDone] = useState(false);
  return (
    <>
      <div className="flex flex-start">
        <button
          className="border border-black px-8  py-2 mr-3 hover:bg-black hover:text-white "
          onClick={() => setCategory("MY")}
        >
          내 게시글
        </button>
        <button
          className="border border-black px-8  py-2 hover:bg-black hover:text-white "
          onClick={() => setCategory("LK")}
        >
          좋아요 한 게시글
        </button>
      </div>
      <Select
        options={isDoneOptions}
        defaultValue={isDoneOptions[0]}
        onChange={(event: any) => {
          setDone(event.value);
        }}
      />
      <UserList category={category} done={done} />
    </>
  );
};

export default UserCategoryBtn;
