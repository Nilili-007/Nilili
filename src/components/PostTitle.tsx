import React from "react";
import Select from "react-select";
import styled from "styled-components";

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

const PostTitle = () => {
  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      <div className="flex gap-5 md:gap-10 items-center h-24 justyfy-center">
        <div className="w-1/4 md:w-1/7">
          <Select
            options={regionOptions}
            placeholder={"지역명"}
            autoFocus={true}
          />
        </div>
        <input className="w-3/4 md:w-6/7 md:text-3xl sm:text-lg sm:w-full p-2 border-slate-300 border-b-2 " />
      </div>
      <div>
        <Select
          options={hashTagOptions}
          isMulti
          isSearchable={false}
          isClearable={true}
          placeholder={"#해시태그"}
        />
      </div>
    </div>
  );
};

// const RegionSelect = styled(Select)`
// @media screen {

// }
//   width: 160px;
// `;

export default PostTitle;
