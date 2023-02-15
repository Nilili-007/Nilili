const CityList = () => {
  return (
    <div className=" my-10   3xl:w-[60%] 2xl:w-[70%] w-[90%]  ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        NOW IN KOREA
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        NILILI 에디터가 선정한 3개 지역의 인기있는 일정을 함께해보세요.
      </p>
      <ul className=" overflow-x-auto whitespace-nowrap no-scrollbar">
        {new Array(3).fill(null).map((_, idx) => (
          <li className="md:w-[31%] w-[360px]  inline-block mx-3  " key={idx}>
            <p className="text-3xl font-medium ">SEOUL</p>
            <img
              alt="지역별 좋아요 이미지"
              src="/assets/course.jpg"
              className=" border-t-2 border-black pt-6"
            />
            <p className="pr-4 ml-1 mt-5 mb-5  sm:text-2xl text-xl overflow-hidden font-black ">
              제목
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              작성자
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              시간
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
