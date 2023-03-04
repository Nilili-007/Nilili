import React from "react";
import Select from "react-select";
import ColorStyles from "../shared/ColorStyles";

export const regionOptions = [
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
  regions?: any;
  setRegions?: any;
  regionsRef: any;
}

const PostCategories = ({ regions, setRegions, regionsRef }: titleProps) => {
  const handleCategorySelect = (data: any) => {
    setRegions(data);
  };
  const limit = 4;

  return (
    <div className="flex w-full sm:w-[80%] items-center h-16 gap-4 text-xs sm:text-lg">
      <Select
        ref={regionsRef}
        options={regionOptions}
        placeholder="지역을 선택해주세요."
        onChange={handleCategorySelect}
        isMulti
        value={regions}
        className="w-full basic-multi-select z-20"
        classNamePrefix="select"
        isSearchable={true}
        isOptionDisabled={(region) => regions && regions.length >= limit}
        styles={ColorStyles}
      />
    </div>
  );
};

export default PostCategories;
