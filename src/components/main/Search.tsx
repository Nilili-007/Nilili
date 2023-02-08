import { useState } from "react";

const Search = () => {
  const [category, setCategory] = useState("LC");
  return (
    <div className="my-10 mx-auto  lg:w-[910px] md:w-[610px] min-w-[310px]">
      <div className="flex justify-evenly text-gray-400 text-s ">
        <button
          className="border-b-2 border-black pb-2"
          onClick={() => setCategory("LC")}
        >
          장소 선택하기
        </button>
        <button onClick={() => setCategory("HT")}> 해시태그 선택하기</button>
        <button onClick={() => setCategory("SC")}> 검색하기</button>
      </div>
      <div className="border  border-black flex justify-center py-5">
        <input
          placeholder="키워드를 입력하세요"
          className="indent-2 text-xs bg-gray-50 lg:w-[810px] md:w-[510px] min-w-[210px]"
        />
        <button className="bg-black text-white ml-2 p-2 text-xs">선택</button>
      </div>
    </div>
  );
};

export default Search;
