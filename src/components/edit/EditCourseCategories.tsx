import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostCategories";
import { MultiStyles } from "../shared";

interface EditTitleProps {
  regionsRef: any;
  setTravelStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  travelStatus: boolean | null;
  filterRegion: optionType[];
  regions: any;
  setRegions: React.Dispatch<React.SetStateAction<optionType[]>>;
  filterTags: optionType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<optionType[] | null>>;
  selectedTags: any;
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
}: EditTitleProps) => {
  const regionLimit = 4;
  const tagLimit = 5;
  const onClickStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const eventTarget = e.target as HTMLElement;

    if (eventTarget.innerText === "여행 계획") {
      setTravelStatus(false);
    }
    if (eventTarget.innerText === "여행 후기") {
      setTravelStatus(true);
    }
  };
  const handleCategorySelect = (data: any) => {
    setRegions(data);
  };

  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }

  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between -mt-10 xs:mt-0">
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="w-full flex justify-between">
            <p className="text-2xl whitespace-normal font-bold xs:text-[16px]">
              나만의 코스를 만들어보세요.
            </p>
          </div>
          <p className="text-gray-400 -mt-2 text-xl whitespace-normal xs:text-xs xs:-mt-1">
            간단한 클릭으로 여행지를 추가하고 순서를 변경할 수 있어요.
          </p>
        </div>
        <div className="flex sm:float-right gap-3 sm:gap-0 border-b-[1.5px] border-gray-03 sm:border-none my-5">
          <Category
            onClick={(e) => onClickStatus(e)}
            className={travelStatus === false ? "clicked" : ""}
          >
            여행 계획
          </Category>
          <Category
            onClick={(e) => onClickStatus(e)}
            className={travelStatus === true ? "clicked" : ""}
          >
            여행 후기
          </Category>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6 mt-4 lg:m-0">
        <div className="flex w-full items-center text-xs sm:text-lg">
          <Select
            ref={regionsRef}
            options={regionOptions}
            defaultValue={filterRegion}
            onChange={handleCategorySelect}
            isMulti
            placeholder="지역을 선택해주세요."
            className="w-full basic-multi-select z-20"
            classNamePrefix="select"
            isOptionDisabled={(region) =>
              regions && regions.length >= regionLimit
            }
            styles={MultiStyles}
          />
        </div>

        <div className="mb-8 text-xs sm:text-lg">
          <Select
            isMulti
            defaultValue={filterTags}
            placeholder={"#해시태그를 선택해주세요."}
            options={hashTagOptions}
            onChange={handleTagSelect}
            className="basic-multi-select z-10"
            isOptionDisabled={(selectedTag) =>
              selectedTags && selectedTags.length >= tagLimit
            }
            styles={MultiStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCourseCategories;

const Category = styled.button`
  padding: 3px 0px 3px 0px;
  height: 40px;
  cursor: pointer;
  color: #a0a4a8;
  font-size: 18px;
  &.clicked {
    color: #000000;
    text-decoration: underline;
    text-underline-offset: 12px;
    font-weight: 500;
    text-decoration-thickness: 1.5px;
  }
  @media screen and (min-width: 415px) {
    width: 100px;
    height: 40px;
    padding: 6px 12px;
    border: 1px solid #4b5563;
    margin-top: 6px;
    margin-bottom: 10px;
    color: #4b5563;
    font-size: 16px;
    &.clicked {
      background: black;
      color: white;
      text-decoration: none;
    }
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
    font-size: 18px;
  }
  &:first-child {
    border-right: none;
  }
`;
