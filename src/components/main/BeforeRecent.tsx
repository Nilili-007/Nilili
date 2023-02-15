import { useGetRecentListQuery } from "../../redux/modules/apiSlice";
const BeforeRecent = () => {
  const { data, isLoading, isError } = useGetRecentListQuery();
  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        여행 전 최신글
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        아직 고민 중이신가요? 이런 일정은 어떠세요?
      </p>
      <ul className="overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item: CourseType) => item.isDone === false)
          .slice(0, 4)
          .map((item) => (
            <li
              className="md:w-[23%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   "
              key={item.id}
            >
              <img alt="최신순 이미지" src="/assets/course.jpg" />
              <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                {item.title}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.nickname}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BeforeRecent;