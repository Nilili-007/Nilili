import React, { useState } from "react";
import { PostMobileMemo } from "./index";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  CourseOrderBtns,
  CourseMemo,
  CourseLocationInfo,
  CourseDeleteBtn,
} from "../common";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const PostMobileCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState("");
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const handleOpenCourse = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenCourse(!openCourse);
  };

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      {lists?.length > 0 && lists[filteredIdx] ? (
        <ItemCard>
          <div className="flex">
            <div>
              <h4 className="font-bold text-[20px]">
                #{filteredIdx + 1} {lists[filteredIdx].name}
              </h4>
              <div className="w-full h-auto mt-1 text-gray-04">
                <p>{lists[filteredIdx].address}</p>
                <p>{lists[filteredIdx].road}</p>
                <p>{lists[filteredIdx].phone}</p>
              </div>
              <PostMobileMemo
                idx={filteredIdx}
                item={lists[filteredIdx]}
                text={text}
                setText={setText}
              />
            </div>
            <div className="ml-auto">
              <CourseDeleteBtn item={lists[filteredIdx]} idx={filteredIdx} />
            </div>
          </div>
        </ItemCard>
      ) : (
        <div className="lg:hidden 3xl:hidden xs:border xs:border-gray-03 xs:p-5 xs:my-8">
          {lists.length === 0 ? (
            <span className="text-[20px] font-bold">
              여행지를 추가해주세요.
            </span>
          ) : (
            <span className="text-[20px] font-bold">
              지도에서 여행지를 선택해보세요.
            </span>
          )}
        </div>
      )}
      {lists.length > 0 ? (
        <button
          onClick={(event) => handleOpenCourse(event)}
          className="lg:hidden 3xl:hidden w-full h-14 border border-gray-03 mb-6 text-[20px] font-bold px-4"
        >
          <div className="lg:hidden 3xl:hidden flex justify-between items-center">
            {openCourse ? (
              <>
                전체 일정 접기
                <BsChevronUp />
              </>
            ) : (
              <>
                전체 일정 열기
                <BsChevronDown />
              </>
            )}
          </div>
        </button>
      ) : null}
      {lists.length > 0 ? (
        <>
          {openCourse && (
            <>
              {lists.map((item: any, idx: number) => {
                return (
                  <ItemCard key={idx}>
                    <div className="flex">
                      <div>
                        <h4 className="font-bold text-[20px]">
                          #{idx + 1} {item.name}
                        </h4>
                        <CourseLocationInfo lists={lists} item={item} />
                        <CourseMemo
                          idx={idx}
                          item={item}
                          text={text}
                          setText={setText}
                        />
                      </div>
                      <CourseDeleteBtn item={item} idx={idx} />
                    </div>
                    {lists.length < 2 ? (
                      <div className="p-3.5" />
                    ) : (
                      <CourseOrderBtns lists={lists} item={item} idx={idx} />
                    )}
                  </ItemCard>
                );
              })}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default PostMobileCourse;

const ItemCard = styled.div`
  border: 1px solid #cbcdd2;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
`;
