import { useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

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
  { value: "#가족", label: "#가족" },
  { value: "#친구", label: "#친구" },
  { value: "#연인", label: "#연인" },
  { value: "#아이들과", label: "#아이들과" },
  { value: "#반려동물", label: "#반려동물" },
  { value: "#혼자", label: "#혼자" },
  { value: "#단체", label: "#단체" },
  { value: "#힐링", label: "#힐링" },
  { value: "#데이트", label: "#데이트" },
  { value: "#쇼핑", label: "#쇼핑" },
  { value: "#맛집", label: "#맛집" },
  { value: "#카페", label: "#카페" },
  { value: "#문화생활", label: "#문화생활" },
  { value: "#캠핑", label: "#캠핑" },
  { value: "#섬", label: "#섬" },
  { value: "#역사", label: "#역사" },
];

const SearchBox = () => {
  const [category, setCategory] = useState("LC");
  const [locations, setLocations] = useState<string[]>([]);
  const [hashtags, sethashtags] = useState<string[]>([]);

  const onChangeHandler = (event: any) => {
    console.log(event);
    setLocations((prev) => [...prev, event.value]);
  };
  console.log(locations);
  return (
    <div className="mb-[2%] 3xl:w-[60%] 2xl:w-[70%] w-[90%] min-w-[370px]">
      <p className=" w-fit mx-auto xl:text-[55px] lg:text-[45px] sm:text-[35px]  text-2xl font-bold my-[5%]">
        WHAT ARE YOUR PLANS?
      </p>
      <div className="hidden sm:flex justify-evenly text-gray-400 font-bold text-2xl">
        <button
          className={`${
            category === "LC"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          } `}
          onClick={() => setCategory("LC")}
        >
          지역 선택하기
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
      <div className="sm:hidden flex justify-evenly text-gray-400 font-bold text-xl">
        <button
          className={`${
            category === "LC"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          } `}
          onClick={() => setCategory("LC")}
        >
          지역
        </button>
        <button
          className={`${
            category === "HT"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          }  `}
          onClick={() => setCategory("HT")}
        >
          해시태그
        </button>
        <button
          className={`${
            category === "SC"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 font-medium"
          } `}
          onClick={() => setCategory("SC")}
        >
          목적지
        </button>
      </div>
      <div className="border  border-black flex items-center  p-[40px]">
        <div
          className={`${
            category === "LC" ? "block" : "hidden"
          } indent-2 w-[90%]`}
        >
          <Select
            options={regionOptions}
            placeholder={"지역명"}
            autoFocus={true}
            isMulti
            isSearchable={true}
            isClearable={true}
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
        <div
          className={`${
            category === "HT" ? "block" : "hidden"
          } indent-2 w-[90%]`}
        >
          <Select
            options={hashTagOptions}
            isMulti
            isSearchable={true}
            isClearable={true}
            placeholder={"#해시태그"}
          />
        </div>

        <input
          className={`${
            category === "SC" ? "block" : "hidden"
          } rounded-sm indent-4 border border-gray-300 w-[90%] h-[38px]`}
          placeholder="입력하세요."
        />

        <button className="hidden sm:block bg-black  text-white ml-10 px-20 py-3 text-lg">
          SEARCH
        </button>
        <button className="sm:hidden bg-black  text-white ml-10 p-3 text-lg">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
