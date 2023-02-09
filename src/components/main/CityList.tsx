const CityList = () => {
  return (
    <div className=" my-10 ">
      <p className=" w-fit text-[55px] font-bold">NOW IN KOREA</p>
      <p className="pb-5 w-fit text-xl text-[#999999]">
        NILILI 에디터가 선정한 3개 지역의 인기있는 일정을 함께해보세요.
      </p>
      <div className=" w-[1200px] flex flex-wrap justify-between ">
        {new Array(3).fill(null).map((_, idx) => (
          <div key={idx}>
            <p className="text-3xl font-medium">SEOUL</p>
            <img
              alt="최신순 이미지"
              src="/assets/course.jpg"
              className="w-[384px] h-[296px] pt-5 border-t-2 border-black"
            />
            <p className="0 ml-1 mt-5 w-[360px] h-[60px] text-2xl overflow-hidden font-black">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className="ml-1 mt-2 w-[360px] h-[30px] font-medium text-gray-400 text-xl mb-3 ">
              작성자 이름
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
