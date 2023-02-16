import { useGetLikeListQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
const AfterLike = () => {
  const { data, isLoading, isError } = useGetLikeListQuery();
  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        여행 후 최다 좋아요
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        아직 고민 중이신가요? 이런 일정은 어떠세요?
      </p>
      <ul className="overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item: CourseType) => item.isDone === true)
          .slice(0, 3)
          .map((item) => (
            <Link to={`/course/${item.id}`}>
              <li
                className="md:w-[31%] w-[360px]  inline-block mx-3  "
                key={item.id}
              >
                <img
                  alt="지역별 좋아요 이미지"
                  src="/assets/saryangdo.jpg"
                  className=" border-t-2 border-black pt-6"
                />
                <p className="pr-4 ml-1 mt-5 mb-5  sm:text-2xl text-xl overflow-hidden font-black ">
                  {item.title}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {item.nickname}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {item.createdAt}
                </p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default AfterLike;
