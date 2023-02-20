import React from "react";
import Select from "react-select";

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
  category?: string;
  setCategory?: any;
  courseTitle?: string;
  setCourseTitle?: any;
}

const PostTitle = ({
  category,
  setCategory,
  courseTitle,
  setCourseTitle,
}: titleProps) => {
  return (
    <div className="flex items-center h-16 gap-4">
      <div className="w-[15%] xs:w-1/3 xs:text-xs ">
        <Select
          options={regionOptions}
          placeholder={"지역"}
          autoFocus={true}
          onChange={(event: any) => {
            setCategory(event.value);
          }}
          value={regionOptions.filter(function (option) {
            return option.value === category;
          })}
        />
      </div>
      <input
        className="w-full px-2 py-1.5 border border-gray-400 focus:outline-none"
        value={courseTitle}
        onChange={(event) => {
          setCourseTitle(event.target.value);
        }}
      />
    </div>
  );
};

export default PostTitle;
