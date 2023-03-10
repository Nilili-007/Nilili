import { Dispatch, SetStateAction, useState } from "react";
import {
  CourseOrderBtns,
  CourseMemo,
  CoursePlaceInfo,
  CourseDeleteBtn,
  SearchModalAddCourseBtn,
} from "../common";
import styled from "styled-components";
import { useCourse } from "../../hooks";

interface PostProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PostCourse = ({ setModalOpen }: PostProps) => {
  const { lists } = useCourse();
  const { filteredIdx } = useCourse();
  const { getIdx } = useCourse();
  const [text, setText] = useState<string>("");

  return (
    <div className="w-[40%] pl-4 md:pl-7 float-right xs:hidden">
      <SearchModalAddCourseBtn setModalOpen={setModalOpen} />
      <div className="flex flex-col h-[932px] overflow-y-scroll ">
        {lists?.map((item: CourseListType, idx: number) => {
          return (
            <ItemCard
              key={idx}
              onClick={(event) => getIdx(event, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <div className="flex">
                <div className="w-full">
                  <CoursePlaceInfo lists={lists} item={item} idx={idx} />
                  <CourseMemo
                    idx={idx}
                    item={item}
                    text={text}
                    setText={setText}
                  />
                </div>
                <CourseDeleteBtn idx={idx} />
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
  border: 1px solid #a0a4a8;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
  @media screen and (max-width: 414px) {
    padding: 15px 20px 20px 20px;
    margin-bottom: 20px;
  }
`;
