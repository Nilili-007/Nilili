import React from "react";
import Select, { StylesConfig } from "react-select";

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

  const colourStyles: StylesConfig<optionType, true> = {
    control: (styles) => ({ ...styles, borderRadius: "0" }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#000000"
          : isFocused
          ? "#000000"
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? "#000000"
          : isFocused
          ? "#ffffff"
          : "#000000",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#000000"
              : "#A0A4A8"
            : undefined,
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#000000",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#ffffff",
      paddingLeft: 10,
      fontSize: 16,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#ffffff",
      ":hover": {
        // backgroundColor: "#CBCDD2",
        color: "#e4291f",
      },
    }),
  };

  return (
    <div className="flex w-[85%] items-center h-16 gap-4">
      <div className="w-full xs:w-1/3 xs:text-xs ">
        <Select
          ref={regionsRef}
          options={regionOptions}
          placeholder={"지역"}
          onChange={handleCategorySelect}
          isMulti
          value={regions}
          className="basic-multi-select z-20"
          classNamePrefix="select"
          isSearchable={true}
          isOptionDisabled={(region) => regions && regions.length >= limit}
          styles={colourStyles}
        />
      </div>
    </div>
  );
};

export default PostCategories;
