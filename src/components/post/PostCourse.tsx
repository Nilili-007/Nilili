import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCourseDesc, PostTextarea } from "./index";
import styled from "styled-components";
import { FiMinus } from "react-icons/fi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/courseSlice";

interface PostProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setBoundsInfo: Dispatch<SetStateAction<object>>;
}

const PostCourse = ({ setBoundsInfo }: PostProps) => {
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const [text, setText] = useState("");

  const onClickGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
    setBoundsInfo(item.bounds);
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

  return (
    <div className="w-[472px] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {lists?.map((item: any, idx: number) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => onClickGetId(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
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
                    setBoundsInfo={setBoundsInfo}
                  />
                </div>
                <div>
                  <FiMinus
                    onClick={() => onClickDeleteCourse(item, idx)}
                    className="text-[26px] text-gray-04 -ml-5"
                  />
                </div>
              </div>
              {lists.length < 2 ? (
                <div className="p-3.5" />
              ) : (
                <div className="flex text-2xl mt-3 float-right">
                  <ItemBtn className={lists[0] === item ? "non-clicked" : ""}>
                    <BsChevronUp onClick={() => onClickUpCourse(idx)} />
                  </ItemBtn>
                  <ItemBtn
                    className={
                      lists[lists.length - 1] === item ? "non-clicked" : ""
                    }
                  >
                    <BsChevronDown onClick={() => onClickDownCourse(idx)} />
                  </ItemBtn>
                </div>
              )}
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
};

export default PostCourse;

export const ItemCard = styled.div`
  border: 1px solid #cbcdd2;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
`;

export const ItemBtn = styled.span`
  &.non-clicked {
    color: #cccccc;
  }
  &:first-child {
    margin-right: 20px;
  }
`;
