import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCourseDesc, PostTextarea } from "./index";
import styled from "styled-components";
import { TiMinus } from "react-icons/ti";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/temporarySlice";

interface PostProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setBoundsInfo: Dispatch<SetStateAction<object>>;
}

const PostCourseInfo = ({ setBoundsInfo }: PostProps) => {
  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredIdx = useSelector(
    (state: any) => state.temporarySlice.filteredIdx
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
    <div className="w-[35%] max-h-[70vh] pl-7 float-right">
      <div className="flex flex-col h-full overflow-y-scroll ">
        {courseList?.map((item: any, idx: number) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => onClickGetId(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full">
                  <h4 className="pl-3 font-bold text-xl">
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
                <TiMinus
                  onClick={() => onClickDeleteCourse(item, idx)}
                  className="-mt-2 text-3xl text-gray-400 hover:text-black"
                />
              </div>
              {courseList.length < 2 ? (
                <div className="p-3.5" />
              ) : (
                <div className="flex text-2xl p-3 -mt-5 float-right">
                  <ItemBtn
                    className={courseList[0] === item ? "non-clicked" : ""}
                  >
                    <AiOutlineUp onClick={() => onClickUpCourse(idx)} />
                  </ItemBtn>
                  <ItemBtn
                    className={
                      courseList[courseList.length - 1] === item
                        ? "non-clicked"
                        : ""
                    }
                  >
                    <AiOutlineDown onClick={() => onClickDownCourse(idx)} />
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

export default PostCourseInfo;

export const ItemCard = styled.div`
  border: 1px solid #9ca3af;
  margin-bottom: 32px;
  cursor: pointer;
  &.clicked {
    background: black;
    color: white;
  }
`;

export const ItemBtn = styled.span`
  &.non-clicked {
    color: #cccccc;
  }
`;
