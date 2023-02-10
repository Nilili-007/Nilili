const SearchList = () => {
  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <ul className="  flex flex-wrap justify-evenly">
        {new Array(16).fill(null).map((_, idx) => (
          <li
            className="xl:w-[24%] lg:w-[32%] sm:w-[47%] w-[90%] pt-6 border-t-2 border-black  "
            key={idx}
          >
            <img alt="지역별 최다 좋아요" src="/assets/course.jpg" />
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

export default SearchList;
