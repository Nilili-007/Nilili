import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addDesc,
  deleteCourse,
  filterCourse,
  updateCourse,
} from "../../redux/modules/temporarySlice";
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

  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  const descList = useSelector((state: any) => state.temporarySlice.descList);

  const filteredDesc = descList?.filter((item: any) => {
    if (item.id === filteredId) {
      return item;
    }
  });

  console.log(filteredDesc);

  const initialDragData: IinitialDragData = {
    target: null,
    index: -1,
    move_down: [],
    move_up: [],
    updateLists: [],
  };

  const [text, setText] = useState("");
  const [dragList, setDragList] = useState(temporaryList);
  const [dragData, setDragData] = useState(initialDragData);
  const [isDragged, setIsDragged] = useState<any | null>(false);

  const showModal = () => {
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

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
    // dispatch(filterKey(key));
  };

  const onClickAddDesc = (item: any) => {
    const newDesc = {
      id: item.id,
      desc: text,
    };
    if (text) {
      dispatch(addDesc(newDesc));
      setText("");
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
    <div className="w-[35%] h-[1000px] pl-7 float-right">
      <div className="flex flex-col h-full overflow-y-scroll ">
        {dragList?.map((item: any, key: any) => {
          let default_class = "";
          dragData.move_up.includes(key) && (default_class = "move_up");
          dragData.move_down.includes(key) && (default_class = "move_down");

          return (
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
              onMouseLeave={() => onClickAddDesc(item)}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full">
                  <h4 className="pl-3 font-bold text-xl">
                    #{key + 1} {item.name}
                  </h4>
                  <PostCourseDesc item={item} />
                  {/* descList 중에서 id가 item.id와 일치하는 내용만 보여주기 */}
                  {descList[0].desc}

                  {item.id === filteredId ? (
                    <>
                      <textarea
                        placeholder="자유롭게 메모를 남겨보세요."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onClick={() => onClickGetId(item)}
                        className="border-b border-gray-600 w-full h-20 mt-3 ml-3 py-1 text-sm focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <textarea
                        placeholder="자유롭게 메모를 남겨보세요."
                        onClick={() => onClickGetId(item)}
                        className="border-b border-gray-600 w-full h-20 mt-3 ml-3 py-1 text-sm focus:outline-none"
                      />
                    </>
                  )}
                  {/* <button
                    onClick={() => onClickAddDesc(item)}
                    className="bg-black text-white px-2 py-1 mt-1 -mr-3 float-right"
                  >
                    등록
                  </button> */}
                </div>
                <TiMinus
                  onClick={() => onClickDeleteCourse(item)}
                  className="-mt-2 text-3xl text-gray-400 hover:text-black"
                />
              </div>
            </CourseItem>
          );
        })}
        <button onClick={showModal} className="bg-black text-white py-2">
          여행지 추가하기
        </button>
      </div>
    </div>
  );
};

export default PostCourseLine;

const CourseItem = styled.h5`
  cursor: grab;
  margin-bottom: 30px;
  border: 1px solid #9ca3af;
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
    border: 1px solid black;
  }

  @media screen and (max-width: 414px) {
  }
`;
