const SearchList = () => {
  return (
    <div className=" my-10 ">
      <div className=" w-[1200px] flex flex-wrap justify-between ">
        {new Array(16).fill(null).map((_, idx) => (
          <div className=" pt-6 border-t-2 border-black w-[290px]  " key={idx}>
            <img
              alt="지역별 최다 좋아요"
              src="/assets/course.jpg"
              className="w-[290px] h-[230px]"
            />
            <p className="0 ml-1 mt-5 w-[280px] h-[60px] text-2xl overflow-hidden font-black">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className="ml-1 mt-2 w-[280px] h-[30px] font-medium text-gray-400 text-xl mb-3 ">
              작성자 이름
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
