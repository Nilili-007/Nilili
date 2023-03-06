import React, { useEffect, useState } from "react";
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
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { useParams } from "react-router-dom";
import {
  useDeleteCourse,
  useDownCourse,
  useFilterCourse,
  useUpCourse,
} from "../../hooks";

const EditCourseInfo = () => {
  const [text, setText] = useState<any>("");

  const paramId = useParams().id;
  const { data } = useGetCourseQuery();
  const reduxLists = useSelector((state: any) => state.courseSlice.courseList);
  const fbLists = JSON.parse(
    data?.filter((course: CourseType) => course.id === paramId).pop()
      ?.courseList
  );
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const [lists, setLists] = useState(fbLists);

  const getIdx = useFilterCourse();
  const liftUp = useUpCourse();
  const liftDown = useDownCourse();
  const deleteCourse = useDeleteCourse();

  useEffect(() => {
    setLists(reduxLists);
  }, [reduxLists]);

  return (
    <div className="w-[472px] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {lists?.map((item: any, idx: any) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => getIdx(item, idx)}
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
                    text={text}
                    setText={setText}
                  />
                </div>
                <FiMinus
                  onClick={() => deleteCourse(item, idx)}
                  className="text-[26px] text-gray-04 -ml-5"
                />
              </div>
              <div className="flex text-2xl mt-3 float-right">
                <ItemBtn className={lists[0] === item ? "non-clicked" : ""}>
                  <BsChevronUp onClick={() => liftUp(idx)} />
                </ItemBtn>
                <ItemBtn
                  className={
                    lists[lists.length - 1] === item ? "non-clicked" : ""
                  }
                >
                  <BsChevronDown onClick={() => liftDown(idx)} />
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
