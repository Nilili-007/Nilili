import UserList from "./UserList";
import { useState } from "react";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { getAuth } from "@firebase/auth";

const UserCategoryBtn = () => {
  const [category, setCategory] = useState("MY");
  const [done, setDone] = useState(false);

  const { refetch } = useGetCourseQuery();
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;

  return (
    <div className="flex flex-col w-[70%]">
      <div className="flex  border-b-4 border-black">
        <button
          className={`body1 p-4 ${category === "MY" ? null : "text-gray-04"} `}
          onClick={() => {
            refetch();
            setCategory("MY");
          }}
        >
          내 게시글
        </button>
        <button
          className={`body1 p-4 ${category === "MY" ? "text-gray-04" : null} `}
          onClick={() => {
            refetch();
            setCategory("LK");
          }}
        >
          좋아요 한 게시글
        </button>
      </div>
      <div className="flex flex-row justify-between items-center ">
        <div>
          {category === "MY" ? (
            <p className=" ml-4 my-[2%] w-fit  eng-display2 font-eng ">
              MY PATH
            </p>
          ) : (
            <p className=" ml-4 my-[2%] w-fit  eng-display2 font-eng ">
              MY LIKES
            </p>
          )}
          <p className=" hidden sm:block ml-4 pb-5 w-fit body2 text-gray-04">
            {userName}님이 작성한 여행 여정을 되돌아보세요.
          </p>
        </div>
        <div>
          <button
            className={`badge border border-black px-[20px] py-[8px] ${
              done === false ? "bg-black text-white " : null
            } `}
            onClick={() => {
              refetch();
              setDone(false);
            }}
          >
            여행 전
          </button>
          <button
            className={`badge border border-black px-[20px] py-[8px] ${
              done === true ? "bg-black text-white " : null
            } `}
            onClick={() => {
              refetch();
              setDone(true);
            }}
          >
            여행 후
          </button>
        </div>
      </div>
      <UserList category={category} done={done} />
    </div>
  );
};

export default UserCategoryBtn;
