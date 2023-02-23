import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCourseDesc, PostTextarea } from "./index";
import styled from "styled-components";
import { TiMinus } from "react-icons/ti";
import { AiOutlineUp, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
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

const PostCourseInfo = ({
  modalOpen,
  setModalOpen,
  setBoundsInfo,
}: PostProps) => {
  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  const [lists, setLists] = useState(courseList);
  const [text, setText] = useState("");

  const onClickDeleteCourse = (item: any) => {
    // 모달로 변경
    if (window.confirm("일정에서 삭제하시겠습니까?")) {
      dispatch(deleteCourse(item.id));
      dispatch(deleteMemo(item.id));
      setText("");
    }
  };

  const onClickUpCourse = (item: any) => {
    dispatch(upCourse(item));
  };

  const onClickDownCourse = (item: any) => {
    dispatch(downCourse(item));
  };

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
    setBoundsInfo(item.bounds);
  };

  useEffect(() => {
    setLists(courseList);
  }, [courseList]);

  return (
    <div className="w-[35%] max-h-[70vh] pl-7 float-right">
      <div className="flex flex-col h-full overflow-y-scroll ">
        {lists?.map((item: any, key: any) => {
          return (
            <ItemCard
              key={key}
              onClick={() => onClickGetId(item)}
              className={item.id === filteredId ? "clicked" : " "}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full">
                  <h4 className="pl-3 font-bold text-xl">
                    #{key + 1} {item.name}
                  </h4>
                  <PostCourseDesc item={item} />
                  <PostTextarea
                    item={item}
                    text={text}
                    setText={setText}
                    setBoundsInfo={setBoundsInfo}
                  />
                </div>
                <TiMinus
                  onClick={() => onClickDeleteCourse(item)}
                  className="-mt-2 text-3xl text-gray-400 hover:text-black"
                />
              </div>
              <div className="flex text-3xl p-3 -mt-5">
                <AiOutlineUp
                  onClick={() => onClickUpCourse(item)}
                  className="hover:text-gray-400"
                />
                <AiOutlineDown
                  onClick={() => onClickDownCourse(item)}
                  className="hover:text-gray-400 ml-auto"
                />
              </div>
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
