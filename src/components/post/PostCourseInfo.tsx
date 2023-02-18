import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCourseDesc from "./PostCourseDesc";
import PostTextarea from "./PostTextarea";
import PostBtn from "./PostBtn";
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
  boundsInfo: object;
  setBoundsInfo: Dispatch<SetStateAction<object>>;
}

const PostCourseInfo = ({
  modalOpen,
  setModalOpen,
  boundsInfo,
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

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

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
    <div className="w-[35%] max-h-[62vh] pl-7 float-right">
      <div className="flex flex-col h-full overflow-y-scroll ">
        {lists?.map((item: any, key: any) => {
          return (
            <ItemCard
              key={key}
              onClick={() => onClickGetId(item)}
              className={item.id === filteredId ? "clicked" : " "}
              // className="border border-gray-400 mb-8 cursor-pointer"
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full">
                  <h4 className="pl-3 font-bold text-xl">
                    #{key + 1} {item.name}
                  </h4>
                  <PostCourseDesc item={item} />
                  <PostTextarea item={item} text={text} setText={setText} />
                </div>
                <TiMinus
                  onClick={() => onClickDeleteCourse(item)}
                  className="-mt-2 text-3xl text-gray-400 hover:text-black"
                />
              </div>
              <div className="flex text-3xl p-3 -mt-10">
                <AiOutlineUp
                  onClick={() => onClickUpCourse(item)}
                  className="hover:text-gray-400"
                />
                <AiOutlineDown
                  onClick={() => onClickDownCourse(item)}
                  className="hover:text-gray-400"
                />
              </div>
            </ItemCard>
          );
        })}
      </div>
      <button
        onClick={showModal}
        className="w-full border border-gray-400 py-2 flex justify-center"
      >
        <AiOutlinePlus className="text-5xl text-gray-300" />
      </button>
      <PostBtn />
    </div>
  );
};

export default PostCourseInfo;

const ItemCard = styled.div`
  border: 1px solid #9ca3af;
  margin-bottom: 32px;
  cursor: pointer;
  &.clicked {
    background: black;
    color: white;
  }
`;
