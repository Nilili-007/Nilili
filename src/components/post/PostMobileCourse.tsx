import React, { useState } from "react";
import { PostCourseDesc, PostTextarea, PostMobileMemo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/courseSlice";
import styled from "styled-components";
import { ItemBtn } from "./PostCourse";
import { FiMinus } from "react-icons/fi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import Swal from "sweetalert2";

const PostMobileCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState("");
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );
  const dispatch = useDispatch();

  const handleOpenCourse = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenCourse(!openCourse);
  };

  const onClickUpCourse = (idx: number) => {
    dispatch(upCourse(idx));
  };

  const onClickDownCourse = (idx: number) => {
    dispatch(downCourse(idx));
  };

  const onClickDeleteCourse = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    Swal.fire({
      title: "일정에서 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 삭제할래요",
      cancelButtonText: "아니요, 취소할래요",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(filterCourse(newInfo));
        dispatch(deleteCourse(idx));
        dispatch(deleteMemo(item.id));
        setText("");
      }
    });
  };

  console.log(lists.length);

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      {lists?.length > 0 && lists[filteredIdx] ? (
        <ItemCard>
          <div className="flex">
            <div>
              <h4 className="font-bold text-[24px]">
                #{filteredIdx + 1} {lists[filteredIdx].name}
              </h4>
              <div className="w-full h-auto mt-3 text-gray-04">
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
              <FiMinus
                onClick={() =>
                  onClickDeleteCourse(lists[filteredIdx], filteredIdx)
                }
                className="-ml-6 -mt-1 text-[26px] text-gray-04"
              />
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
              여행지를 선택해주세요.
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
            여행지 펼쳐보기
            {openCourse ? <BsChevronUp /> : <BsChevronDown />}
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
                        <h4 className="font-bold text-[24px]">
                          #{idx + 1} {item.name}
                        </h4>
                        <PostCourseDesc item={item} />
                        <PostTextarea
                          idx={idx}
                          item={item}
                          text={text}
                          setText={setText}
                          // setBoundsInfo={setBoundsInfo}
                        />
                      </div>
                      <div>
                        <FiMinus
                          onClick={() => onClickDeleteCourse(item, idx)}
                          className="-ml-6 -mt-1 text-[26px] text-gray-04"
                        />
                      </div>
                    </div>
                    {lists.length < 2 ? (
                      <div className="p-3.5" />
                    ) : (
                      <div className="flex text-2xl mt-3 float-right">
                        <ItemBtn
                          className={lists[0] === item ? "non-clicked" : ""}
                        >
                          <BsChevronUp onClick={() => onClickUpCourse(idx)} />
                        </ItemBtn>
                        <ItemBtn
                          className={
                            lists[lists.length - 1] === item
                              ? "non-clicked"
                              : ""
                          }
                        >
                          <BsChevronDown
                            onClick={() => onClickDownCourse(idx)}
                          />
                        </ItemBtn>
                      </div>
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
