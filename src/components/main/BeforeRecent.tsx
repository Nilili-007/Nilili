import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";

const BeforeRecent = () => {
  const { data, isLoading, isError } = useGetCourseQuery();
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
          ?.filter((item: CourseType) => item.travelStatus === false)
          .slice(0, 4)
          .map((item) => (
            <Link to={`/course/${item.id}`} key={item.id}>
              <li className="md:w-[23%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   ">
                <div className="hover:transition-all w-[300px] h-[300px] bg-no-repeat bg-cover bg-center hover:bg-[url('https://user-images.githubusercontent.com/117059420/219529223-bb81ad92-30cc-4ca2-9ce1-3c7f5dd3a4dc.jpg')] bg-[url('https://user-images.githubusercontent.com/117059420/219529260-5546619d-ed8b-4bc1-86a9-829249a4cd64.jpg')]" />
                <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
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

export default BeforeRecent;
