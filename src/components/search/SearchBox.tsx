import { useState } from "react";
import Select from "react-select";

const regionOptions = [
  { value: "서울", label: "서울" },
  { value: "경기/인천", label: "경기/인천" },
  { value: "충청남도", label: "충청남도" },
  { value: "충청북도", label: "충청북도" },
  { value: "강원도", label: "강원도" },
  { value: "경상북도", label: "경상북도" },
  { value: "경상남도", label: "경상남도" },
  { value: "전라북도", label: "전라북도" },
  { value: "전라남도", label: "전라남도" },
  { value: "제주도", label: "제주도" },
  { value: "부산", label: "부산" },
  { value: "대구", label: "대구" },
  { value: "대전", label: "대전" },
  { value: "광주", label: "광주" },
  { value: "울산", label: "울산" },
];

const hashTagOptions = [
  { value: "#여자혼자", label: "#여자혼자" },
  { value: "#남자혼자", label: "#남자혼자" },
  { value: "#커플끼리", label: "#커플끼리" },
  { value: "#부부끼리", label: "#부부끼리" },
  { value: "#부모님과", label: "#부모님과" },
  { value: "#반려동물", label: "#반려동물" },
  { value: "#아이들과", label: "#아이들과" },
  { value: "#단체여행", label: "#단체여행" },
];

const SearchBox = () => {
  const [category, setCategory] = useState("LC");
  console.log(category);
  return (
    <div className=" lg:w-[1200px] md:w-[700px] min-w-[200px] ">
      <p className=" w-fit mx-auto text-[55px] font-bold my-16">
        WHAT ARE YOUR PLANS?
      </p>
      <div className="flex justify-evenly text-gray-400 font-bold text-2xl">
        <button
          className={`${
            category === "LC"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          } `}
          onClick={() => setCategory("LC")}
        >
          장소 선택하기
        </button>
        <button
          className={`${
            category === "HT"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          }  `}
          onClick={() => setCategory("HT")}
        >
          해시태그 선택하기
        </button>
        <button
          className={`${
            category === "SC"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          } `}
          onClick={() => setCategory("SC")}
        >
          목적지 검색하기
        </button>
      </div>
      <div className="border  border-black flex justify-center bg-purple-300 p-[40px]">
        <input
          placeholder="키워드를 입력하세요"
          className="indent-2 text-xs bg-gray-50  lg:w-[900px] md:w-[510px] min-w-[210px]"
        />
        <button className="bg-black text-white ml-10 px-20 py-3 text-lg">
          SEARCH
        </button>
      </div>
      <Select
        className=""
        options={regionOptions}
        placeholder={"지역명"}
        autoFocus={true}
      />
      <Select
        options={hashTagOptions}
        isMulti
        isSearchable={false}
        isClearable={true}
        placeholder={"#해시태그"}
      />
    </div>
  );
};

export default SearchBox;
