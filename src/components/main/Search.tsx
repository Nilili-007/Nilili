import { useState } from "react";

const Search = () => {
  const [category, setCategory] = useState("LC");
  console.log(category);
  return (
    <div className="my-10 mx-auto  lg:w-[910px] md:w-[610px] min-w-[310px]">
      <div className="flex justify-evenly text-gray-400 text-s font-bold">
        <button
          style={{
            paddingBottom: 10,
            borderColor: "black",
            borderBottomWidth: category === "LC" ? 2 : 0,
            color: category === "LC" ? "black" : "gray",
            fontWeight: category === "LC" ? 700 : 500,
          }}
          onClick={() => setCategory("LC")}
        >
          장소 선택하기
        </button>
        <button
          style={{
            paddingBottom: 10,
            borderColor: "black",
            borderBottomWidth: category === "HT" ? 2 : 0,
            color: category === "HT" ? "black" : "gray",
            fontWeight: category === "HT" ? 700 : 500,
          }}
          onClick={() => setCategory("HT")}
        >
          해시태그 선택하기
        </button>
        <button
          style={{
            paddingBottom: 10,
            borderColor: "black",
            borderBottomWidth: category === "SC" ? 2 : 0,
            color: category === "SC" ? "black" : "gray",
            fontWeight: category === "SC" ? 700 : 500,
          }}
          onClick={() => setCategory("SC")}
        >
          검색하기
        </button>
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
