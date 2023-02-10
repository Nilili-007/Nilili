import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteCourse, updateCourse } from "../../redux/modules/temporarySlice";

interface PostProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface IinitialDragData {
  target: any;
  index: number;
  move_left: any[];
  move_right: any[];
  updateLists: any[];
}

const CourseLine = ({ modalOpen, setModalOpen }: PostProps) => {
  const dispatch = useDispatch();
  const temporaryList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const initialDragData: IinitialDragData = {
    target: null,
    index: -1,
    move_left: [],
    move_right: [],
    updateLists: [],
  };

  const [dragList, setDragList] = useState(temporaryList);
  const [dragData, setDragData] = useState(initialDragData);
  const [isDragged, setIsDragged] = useState<any | null>(false);

  const showModal = () => {
    sessionStorage.clear();
    setModalOpen(!modalOpen);
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
      move_right: [],
      move_left: [],
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
    let move_right = [...dragData.move_right];
    let move_left = [...dragData.move_left];

    let data = [...dragData.updateLists];
    data[_index] = data.splice(_target, 1, data[_index])[0];

    if (_dragged > _target) {
      move_right.includes(_target)
        ? move_right.pop()
        : move_right.push(_target);
    } else if (_dragged < _target) {
      move_left.includes(_target) ? move_left.pop() : move_left.push(_target);
    } else {
      move_right = [];
      move_left = [];
    }

    setDragData({
      ...dragData,
      updateLists: data,
      index: _target,
      move_left,
      move_right,
    });
  };

  const onDragLeave = (e: any) => {
    if (e.target === dragData.target) {
      e.target.style.visibility = "hidden";
    }
  };

  const onClickCircle = (e: any, key: number) => {
    // const targetItem: any = {
    //   name: sesstionCourse[key].name,
    //   address: sesstionCourse[key].address,
    //   road: sesstionCourse[key].road,
    //   phone: sesstionCourse[key].phone,
    // };
    // setTargetPlace(targetItem);
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
    <>
      <div className="border-t border-black mt-20 xs:mt-16 " />
      <div className="flex justify-between mt-4">
        {dragList?.map((item: any, key: any) => {
          let default_class = "";
          dragData.move_right.includes(key) && (default_class = "move_right");
          dragData.move_left.includes(key) && (default_class = "move_left");

          return (
            <div className="flex flex-col justify-between cursor-pointer hover:opacity-50">
              <CourseItem
                draggable
                key={key}
                onClick={(e) => onClickCircle(e, key)}
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
              <div
                onClick={() => onClickDeleteCourse(item)}
                className="flex justify-center items-center w-8 h-8 mb-4 rounded-full bg-black text-white text-3xl xs:w-2 xs:h-2 xs:mb-4"
              >
                -
              </div>
            </div>
          );
        })}
        <div
          onClick={showModal}
          className="flex justify-center items-center w-8 h-8 rounded-full bg-white border border-black text-3xl -mt-8 cursor-pointer xs:w-2 xs:h-2 xs:-mt-6"
        >
          +
        </div>
      </div>
    </>
  );
};

export default CourseLine;

const CourseItem = styled.h5`
  margin-top: -62px;
  font-weight: bold;
  font-size: 20px;
  cursor: grab;

  // 보완 필요
  // 1. 이동 범위 1/n로 계산
  // 2. 드래그 할 아이템과 드랍할 아이템의 영역 자동 계산

  &.move_left {
    transform: translate(-90px, 0);
    z-index: 1;
  }
  &.move_right {
    transform: translate(90px, 0);
    z-index: 1;
  }

  @media screen and (max-width: 414px) {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: -0.3px;
    margin-top: -50px;
  }
`;
