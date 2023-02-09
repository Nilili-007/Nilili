const SearchList = () => {
  return (
    <div className="  my-10 ">
      <p className=" w-56 font-bold text-2xl mb-2">지금 인기있는 코스</p>

      <div className="overflow-x-scroll w-[1100px] flex flex-wrap justify-between ">
        {new Array(16).fill(null).map((_, idx) => (
          <div className=" pt-6 border-t-2 border-black w-[350px]  " key={idx}>
            <img
              alt="최신순 이미지"
              src="/assets/course.jpg"
              className="w-[350px] h-[230px]"
            />
            <p className="0 mx-auto w-[340px] h-[50px] overflow-hidden  font-bold">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className=" mx-auto w-[340px] h-[30px] text-gray-500 text-xs ">
              작성자 이름
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
