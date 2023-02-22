import UserList from "./UserList";
import Select from "react-select";
import { useState } from "react";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";

const isDoneOptions = [
  { value: false, label: "여행 전" },
  { value: true, label: "여행 후" },
];

const UserCategoryBtn = () => {
  const [category, setCategory] = useState("MY");
  const [done, setDone] = useState(false);

  const { refetch } = useGetCourseQuery();

  return (
    <>
      <div className="flex flex-start">
        <button
          className="border border-black px-8  py-2 mr-3 hover:bg-black hover:text-white "
          onClick={() => {
            refetch();
            setCategory("MY");
          }}
        >
          내 게시글
        </button>
        <button
          className="border border-black px-8  py-2 hover:bg-black hover:text-white "
          onClick={() => {
            refetch();
            setCategory("LK");
          }}
        >
          좋아요 한 게시글
        </button>
      </div>
      <Select
        options={isDoneOptions}
        defaultValue={isDoneOptions[0]}
        onChange={(event: any) => {
          refetch();
          setDone(event.value);
        }}
      />
      <UserList category={category} done={done} />
    </>
  );
};

export default UserCategoryBtn;
