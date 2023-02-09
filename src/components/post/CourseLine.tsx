import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

interface IPlacelist {
  name: string;
}

interface PostProps {
  setTargetPlace: Dispatch<SetStateAction<string>>;
  placeList: IPlacelist[];
  setPlaceList: Dispatch<SetStateAction<any>>;
}

interface IinitialDragData {
  target: any;
  index: number;
  move_left: any[];
  move_right: any[];
  updateLists: any[];
}

const CourseLine = ({ setTargetPlace, placeList, setPlaceList }: PostProps) => {
  const initialDragData: IinitialDragData = {
    target: null,
    index: -1,
    move_left: [],
    move_right: [],
    updateLists: [],
  };

  const [dragData, setDragData] = useState(initialDragData);
  const [isDragged, setIsDragged] = useState<any | null>(false);

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
      updateLists: [...placeList],
    });

    e.dataTransfer.setData("text/html", "");
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (e: any) => {
    setIsDragged(false);
    setPlaceList([...dragData.updateLists]);

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
    setTargetPlace(placeList[key].name);
  };

  return (
    <>
      <div className="border-t border-black mt-20 xs:mt-16" />
      <div className="flex justify-between mt-5">
        {placeList.map((item, key) => {
          let default_class = "";

          dragData.move_right.includes(key) && (default_class = "move_right");

          dragData.move_left.includes(key) && (default_class = "move_left");

          return (
            <div
              onClick={(e) => onClickCircle(e, key)}
              key={key}
              className="flex flex-col justify-between cursor-pointer hover:opacity-50"
            >
              <CourseItem
                draggable
                key={key}
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
              <div className="flex justify-center items-center w-4 h-4 mb-3 rounded-full bg-black xs:w-2 xs:h-2 xs:mb-4" />
            </div>
          );
        })}
        <div className="w-4 h-4 rounded-full bg-white border border-black -mt-7 xs:w-2 xs:h-2 xs:-mt-6" />
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

  &.move_left {
    transform: translate(-10px, 0);
    z-index: 1;
  }
  &.move_right {
    transform: translate(10px, 0);
    z-index: 1;
  }

  @media screen and (max-width: 414px) {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: -0.3px;
    margin-top: -50px;
  }
`;
