import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostCategories";

interface EditTitleProps {
  regionsRef: any;
  setTravelStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  travelStatus: boolean | null;
  filterRegion: optionType[];
  regions: any;
  setRegions: React.Dispatch<React.SetStateAction<optionType[] | null>>;
  filterTags: optionType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<optionType[] | null>>;
  selectedTags: any;
  modalOpen: boolean | null;
  setModalOpen: React.Dispatch<React.SetStateAction<any | null>>;
}
const EditCourseCategories = ({
  regionsRef,
  setTravelStatus,
  travelStatus,
  filterRegion,
  regions,
  setRegions,
  filterTags,
  setSelectedTags,
  selectedTags,
  modalOpen,
  setModalOpen,
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
    setRegions(data);
  };
  const showModal = () => {
    setModalOpen(!modalOpen);
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
          <div className="flex">
            <Category
              onClick={(e) => onClickStatus(e)}
              className={travelStatus === false ? "clicked" : ""}
            >
              여행 전
            </Category>
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
        <div className="w-full flex justify-between xs:w-1/3 xs:text-xs ">
          <Select
            ref={regionsRef}
            options={regionOptions}
            defaultValue={filterRegion}
            onChange={handleCategorySelect}
            isMulti
            placeholder="지역을 선택해주세요."
            className="z-20 w-[85%] leading-7 text-[22px]"
            classNamePrefix="select"
            isSearchable={true}
            isOptionDisabled={(region) =>
              regions && regions.length >= regionLimit
            }
          />
          <button
            onClick={() => showModal()}
            className="w-[14%] bg-black text-white text-lg  hover:text-black hover:border-black hover:border-2 hover:bg-white"
          >
            목적지 추가하기
          </button>
        </div>
      </div>
      <div className="mb-8">
        <Select
          isMulti
          defaultValue={filterTags}
          placeholder={"#해시태그를 선택해주세요"}
          options={hashTagOptions}
          onChange={handleTagSelect}
          className="z-10 leading-7 text-[22px]"
          isSearchable={true}
          isOptionDisabled={(selectedTag) =>
            selectedTags && selectedTags.length >= tagLimit
          }
        />
      </div>
    </div>
  );
};

export default EditCourseCategories;

const Category = styled.button`
  height: 40px;
  padding: 6px 12px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;
  color: #4b5563;
  font-size: 18px;

  &.clicked {
    background: black;
    color: white;
  }
`;
