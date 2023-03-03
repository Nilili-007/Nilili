import React, { useState } from "react";
import { ItemBtn, ItemCard } from "../post/PostCourse";
import { FiMinus } from "react-icons/fi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/courseSlice";
import { EditCourseTextarea } from "./index";
import Swal from "sweetalert2";

const EditCourseInfo = () => {
  const [text, setText] = useState<any>("");
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const onClickDeleteCourse = (item: any, idx: number) => {
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
        dispatch(deleteCourse(idx));
        dispatch(deleteMemo(idx));
        setText("");
      }
    });
  };

  const onClickUpCourse = (item: any) => {
    dispatch(upCourse(item));
  };

  const onClickDownCourse = (item: any) => {
    dispatch(downCourse(item));
  };

  const onClickGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
    console.log(newInfo);
  };

  return (
    <div className="w-[472px] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {lists?.map((item: any, idx: any) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => onClickGetId(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <div className="w-full flex">
                <div className="w-full">
                  <h4 className="title3">
                    #{idx + 1} {item.name}
                  </h4>
                  <div className="w-full h-auto mt-3 text-gray-04">
                    <p>{item.address}</p>
                    <p>{item.road}</p>
                    <p>{item.phone}</p>
                  </div>
                  <EditCourseTextarea
                    idx={idx}
                    item={item}
                    filteredIdx={filteredIdx}
                    text={text}
                    setText={setText}
                  />
                </div>
                <FiMinus
                  onClick={() => onClickDeleteCourse(item, idx)}
                  className="text-[26px] text-gray-04 -ml-5"
                />
              </div>
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
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
};

export default EditCourseInfo;
