import { useGetCityListQuery } from "../../redux/modules/apiSlice";

const CityList = () => {
  const { data, isLoading, isError } = useGetCityListQuery();
  const seoul = data?.find((item) => item.location === "서울");
  console.log(seoul);
  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10   3xl:w-[60%] 2xl:w-[70%] w-[90%]  ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        NOW IN KOREA
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        NILILI 에디터가 선정한 3개 지역의 인기있는 일정을 함께해보세요.
      </p>
      <ul className=" overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item) => item.location === "서울")
          .map((item) => (
            <li
              className="md:w-[31%] w-[360px]  inline-block mx-3  "
              key={item.id}
            >
              <p className="text-3xl font-medium ">SEOUL</p>
              <img
                alt="지역별 좋아요 이미지"
                src="/assets/course.jpg"
                className=" border-t-2 border-black pt-6"
              />
              <p className="pr-4 ml-1 mt-5 mb-5  sm:text-2xl text-xl overflow-hidden font-black ">
                {JSON.parse(item.createdAt)}
                {item.title}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.nickname}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {JSON.parse(item.createdAt)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CityList;
