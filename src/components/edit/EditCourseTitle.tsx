import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostTitle";

interface EditTitleProps {
  setTravelStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  travelStatus: boolean | null;
  filterRagion: optionType[];
  ragions: any;
  setRagions: React.Dispatch<React.SetStateAction<optionType[] | null>>;
  courseTitle: string | undefined;
  setCourseTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterTags: optionType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<optionType[] | null>>;
  selectedTags: any;
}
const EditCourseTitle = ({
  setTravelStatus,
  travelStatus,
  filterRagion,
  ragions,
  setRagions,
  courseTitle,
  setCourseTitle,
  filterTags,
  setSelectedTags,
  selectedTags,
}: EditTitleProps) => {
  const regionLimit = 4;
  const tagLimit = 5;
  const onClickStatus = (e: any) => {
    if (e.target.innerText === "여행 전") {
      setTravelStatus(false);
    }
    if (e.target.innerText === "여행 후") {
      setTravelStatus(true);
    }
  };
  const handleCategorySelect = (data: any) => {
    setRagions(data);
  };
  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">목적지를 추가해보세요.</p>
          <p className="text-gray-400 mt-1">
            간단한 클릭으로 여행지를 추가할 수 있어요.
          </p>
        </div>
        <div className="ml-auto">
          <div className="flex ">
            <Category
              onClick={(e) => onClickStatus(e)}
              className={travelStatus === false ? "clicked" : ""}
            >
              여행 전
            </Category>
            <div className="border-r border-gray-600 h-8 mx-3" />
            <Category
              onClick={(e) => onClickStatus(e)}
              className={travelStatus === true ? "clicked" : ""}
            >
              여행 후
            </Category>
          </div>
        </div>
      </div>
      <div className="flex items-center h-16 gap-4">
        <div className="w-[50%] xs:w-1/3 xs:text-xs ">
          <Select
            options={regionOptions}
            defaultValue={filterRagion}
            onChange={handleCategorySelect}
            isMulti
            className="z-20"
            classNamePrefix="select"
            isSearchable={true}
            isOptionDisabled={(region) =>
              ragions && ragions.length >= regionLimit
            }
          />
        </div>
        <input
          className="w-full px-2 py-1.5 border border-gray-400"
          value={courseTitle}
          onChange={(event) => {
            setCourseTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-8">
        <Select
          isMulti
          defaultValue={filterTags}
          placeholder={"#해시태그"}
          options={hashTagOptions}
          onChange={handleTagSelect}
          className="z-10"
          isSearchable={true}
          isOptionDisabled={(selectedTag) =>
            selectedTags && selectedTags.length >= tagLimit
          }
        />
      </div>
    </div>
  );
};

export default EditCourseTitle;

const Category = styled.button`
  height: 32px;
  padding: 0 8px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;

  &.clicked {
    background: black;
    color: white;
  }
`;
