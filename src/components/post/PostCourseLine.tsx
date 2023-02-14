import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteCourse,
  filterCourse,
  updateCourse,
} from "../../redux/modules/temporarySlice";
import { FaCheck } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";
import { TiMinus } from "react-icons/ti";
import PostCourseDesc from "./PostCourseDesc";

interface PostProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface IinitialDragData {
  target: any;
  index: number;
  move_down: any[];
  move_up: any[];
  updateLists: any[];
}

const PostCourseLine = ({ modalOpen, setModalOpen }: PostProps) => {
  const dispatch = useDispatch();
  const temporaryList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const initialDragData: IinitialDragData = {
    target: null,
    index: -1,
    move_down: [],
    move_up: [],
    updateLists: [],
  };

  const [dragList, setDragList] = useState(temporaryList);
  const [dragData, setDragData] = useState(initialDragData);
  const [isDragged, setIsDragged] = useState<any | null>(false);
  const [openDesc, setOpenDesc] = useState<any | null>(false);
  const [targetId, setTargetId] = useState();

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const showDesc = (item: any) => {
    const result = dragList.filter((place: any) => place.id === item.id);
    setTargetId(result[0].id);
    setOpenDesc(!openDesc);
    dispatch(filterCourse(item));
  };

  const onDragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    return true;
  };

  const onDragStart = (e: any) => {
    setIsDragged(true);
    setDragData({
      ...dragData,
      target: e.target,
      index: Number(e.target.dataset.index),
      updateLists: [...dragList],
    });

    e.dataTransfer.setData("text/html", "");
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (e: any) => {
    setIsDragged(false);
    dispatch(updateCourse([...dragData.updateLists]));

    setDragData({
      ...dragData,
      move_up: [],
      move_down: [],
      updateLists: [],
    });

    e.target.style.visibility = "visible";
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: any) => {};

  const onDragEnter = (e: any) => {
    const _dragged = Number(dragData.target.dataset.index);
    const _index = Number(dragData.index);
    const _target = Number(e.target.dataset.index);
    let move_up = [...dragData.move_up];
    let move_down = [...dragData.move_down];

    let data = [...dragData.updateLists];
    data[_index] = data.splice(_target, 1, data[_index])[0];

    if (_dragged > _target) {
      move_up.includes(_target) ? move_up.pop() : move_up.push(_target);
    } else if (_dragged < _target) {
      move_down.includes(_target) ? move_down.pop() : move_down.push(_target);
    } else {
      move_up = [];
      move_down = [];
    }

    setDragData({
      ...dragData,
      updateLists: data,
      index: _target,
      move_down,
      move_up,
    });
  };

  const onDragLeave = (e: any) => {
    if (e.target === dragData.target) {
      e.target.style.visibility = "hidden";
    }
  };

  const onClickDeleteCourse = (item: any) => {
    // 모달로 변경
    if (window.confirm("일정에서 삭제하시겠습니까?")) {
      return dispatch(deleteCourse(item.id));
    }
  };

  useEffect(() => {
    setDragList(temporaryList);
  }, [temporaryList]);

  return (
    <div className="w-1/3 pl-7 float-right">
      <div className="flex items-center justify-center h-full border-l-2 border-black ml-3.5 " />
      <div className="flex flex-col -mt-[1000px] h-full justify-between overflow-y-scroll ">
        {dragList?.map((item: any, key: any) => {
          let default_class = "";
          dragData.move_up.includes(key) && (default_class = "move_up");
          dragData.move_down.includes(key) && (default_class = "move_down");

          return (
            <>
              <div className="flex cursor-pointer">
                <div
                  onClick={() => onClickDeleteCourse(item)}
                  className="flex justify-center items-center w-8 h-8 rounded-full bg-black text-white text-3xl hover:bg-red-500 xs:w-2 xs:h-2"
                >
                  <TiMinus className="text-xl" />
                </div>
                <div className="w-[90%]">
                  <CourseItem
                    draggable
                    key={key}
                    onClick={() => showDesc(item)}
                    data-index={key}
                    data-position={key}
                    onDragOver={onDragOver}
                    onDragStart={(e: any) => onDragStart(e)}
                    onDragEnd={onDragEnd}
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    className={default_class}
                    onDrag={isDragged}
                  >
                    #{key + 1} {item.name}
                  </CourseItem>
                  {targetId === item.id
                    ? openDesc && <PostCourseDesc item={item} />
                    : null}
                </div>
              </div>
            </>
          );
        })}
        <div
          onClick={showModal}
          className="w-8 h-8 rounded-full bg-white border-2 border-black text-3xl cursor-pointer hover:border-red-500 hover:text-red-500 xs:w-2 xs:h-2 xs:-mt-6"
        >
          <HiPlusSm />
        </div>
        {temporaryList.length > 0 ? (
          ""
        ) : (
          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-white border-2 border-black text-sm cursor-pointer xs:w-2 xs:h-2 xs:-mt-6">
            <FaCheck />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCourseLine;

const CourseItem = styled.h5`
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: grab;
  width: 90%;

  // 드롭시 원래 위치로 돌아가는 현상 보완

  &.move_down {
    transform: translate(0, -40px);
    z-index: 1;
  }
  &.move_up {
    transform: translate(0, 40px);
    z-index: 1;
  }

  &:hover {
    color: #ef4444;
  }

  @media screen and (max-width: 414px) {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: -0.3px;
    margin-top: -50px;
  }
`;
