import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";

const UserList = () => {
  const { data, isLoading, isError } = useGetCourseQuery();
  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  const userID = authService.currentUser?.uid;
  console.log(data?.filter((item) => item.userID === userID));

  return (
    <div className="my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        WHAT'S NEW?
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
      </p>

      <ul className="  overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item) => item.userID === userID)
          .map((item) => (
            <li
              className="md:w-[24%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   "
              key={item.id}
            >
              <img alt="최신순 이미지" src="/assets/course.jpg" />
              <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                {item.title}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.createdAt}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
