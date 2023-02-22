import React, { useState } from "react";
import { ItemCard } from "../post/PostCourseInfo";
import { TiMinus } from "react-icons/ti";
import { AiOutlineUp, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/temporarySlice";
import { EditCourseTextarea } from "./index";

const EditCourseInfo = ({ modalOpen, setModalOpen }: any) => {
  const [text, setText] = useState<any>("");
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.temporarySlice.courseList);
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickDeleteCourse = (item: any) => {
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
    //   setBoundsInfo(item.bounds);
  };

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
              <div className="w-full py-3 flex">
                <div className="w-full px-2 ">
                  <h4 className="font-bold text-xl px-2 ">
                    #{key + 1} {item.name}
                  </h4>
                  <p className="px-2">{item.address}</p>
                  <p className="px-2 text-gray-400 text-sm">{item.road}</p>
                  <p className="px-2">{item.phone}</p>
                  <EditCourseTextarea
                    item={item}
                    filteredId={filteredId}
                    text={text}
                    setText={setText}
                  />
                </div>
                <TiMinus
                  onClick={() => onClickDeleteCourse(item)}
                  className="-mt-2 mr-2 text-3xl text-gray-400"
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
        <button
          onClick={showModal}
          className="w-full border border-gray-400 py-2 flex justify-center"
        >
          <AiOutlinePlus className="text-5xl text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default EditCourseInfo;