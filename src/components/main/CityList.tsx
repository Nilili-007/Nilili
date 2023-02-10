const CityList = () => {
  return (
    <div className=" my-10 bg-pink-300 ma 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" w-fit text-[55px] font-bold">NOW IN KOREA</p>
      <p className="pb-5 w-fit text-xl text-[#999999]">
        NILILI 에디터가 선정한 3개 지역의 인기있는 일정을 함께해보세요.
      </p>
      <ul className="flex flex-wrap justify-evenly ">
        {new Array(3).fill(null).map((_, idx) => (
          <li className="lg:w-[32%] sm:w-[47%] w-[90%] pt-6  " key={idx}>
            <p className="text-3xl font-medium ">SEOUL</p>
            <img
              alt="지역별 좋아요 이미지"
              src="/assets/course.jpg"
              className=" border-t-2 border-black pt-6"
            />
            <p className="pr-4 ml-1 mt-5 sm:h-16 h-14 sm:text-2xl text-xl overflow-hidden font-black ">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              작성자 이름
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
