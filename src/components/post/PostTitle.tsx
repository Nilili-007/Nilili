import React from "react";
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

interface titleProps {
  category?: string;
  setCategory?: any;
}

const PostTitle = ({ category, setCategory }: titleProps) => {
  const handleCateSelect = (event: any) => {
    setCategory(event.value);
  };

  return (
    <div className="flex gap-5 md:gap-10 items-center h-24 justyfy-center xs:gap-3 ">
      <div className="w-1/4 xs:w-1/3 xs:text-xs ">
        <Select
          options={regionOptions}
          placeholder={"지역명"}
          autoFocus={true}
          onChange={handleCateSelect}
          value={regionOptions.filter(function (option) {
            return option.value === category;
          })}
        />
      </div>
      <input className="w-3/4 md:w-6/7 md:text-3xl sm:text-lg sm:w-full p-2 border-slate-300 border-b-2 " />
    </div>
  );
};

export default PostTitle;
