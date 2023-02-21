import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";

const SearchList = () => {
  const { data, isLoading, isError } = useGetCourseQuery();
  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <ul className="  flex flex-wrap justify-evenly">
        {data
          ?.filter((item: CourseType) => item.travelStatus === true)
          .map((item) => (
            <Link to={`/course/${item.id}`} key={item.id}>
              <li className="xl:w-[24%] lg:w-[32%] sm:w-[47%] w-[90%] pt-6 border-t-2 border-black  ">
                <img alt="지역별 최다 좋아요" src="/assets/course.jpg" />
                <p className="pr-4 ml-1 mt-5 sm:h-16 h-14 sm:text-2xl text-xl overflow-hidden font-black ">
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

export default SearchList;
