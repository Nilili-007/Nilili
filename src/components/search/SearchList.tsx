const SearchList = () => {
  return (
    <div className=" my-10 ">
      <div className=" w-[1200px] flex flex-wrap justify-between ">
        {new Array(16).fill(null).map((_, idx) => (
          <div className=" pt-6 border-t-2 border-black w-[290px]  " key={idx}>
            <img
              alt="최신순 이미지"
              src="/assets/course.jpg"
              className="w-[290px] h-[230px]"
            />
            <p className="0 mx-auto w-[280px] h-[50px] overflow-hidden  font-bold">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className=" mx-auto w-[280px] h-[30px] text-gray-500 text-xs mb-3 ">
              작성자 이름
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
