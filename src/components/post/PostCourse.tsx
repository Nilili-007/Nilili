import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CourseOrderBtns,
  CourseMemo,
  CourseLocationInfo,
  CourseDeleteBtn,
} from "../common";
import styled from "styled-components";
import { useFilterCourse } from "../../hooks";

const PostCourse = () => {
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const [text, setText] = useState("");
  const getIdx = useFilterCourse();

  return (
    <div className="w-[35%] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {lists?.map((item: any, idx: number) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => getIdx(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <div className="flex">
                <div className="w-full">
                  <h4 className="title3">
                    #{idx + 1} {item.name}
                  </h4>
                  <CourseLocationInfo lists={lists} item={item} />
                  <CourseMemo
                    idx={idx}
                    item={item}
                    text={text}
                    setText={setText}
                  />
                </div>
                <CourseDeleteBtn item={item} idx={idx} />
              </div>
              {lists.length < 2 ? (
                <div className="p-3.5" />
              ) : (
                <CourseOrderBtns lists={lists} item={item} idx={idx} />
              )}
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
};

export default PostCourse;

export const ItemCard = styled.div`
  border: 1px solid #cbcdd2;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
`;
