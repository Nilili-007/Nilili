import { useState } from "react";
import { useSelector } from "react-redux";
import { PostCourseDesc, PostTextarea } from "./index";
import styled from "styled-components";
import { FiMinus } from "react-icons/fi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import {
  useDeleteCourse,
  useDownCourse,
  useFilterCourse,
  useUpCourse,
} from "../../hooks";

const PostCourse = () => {
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const [text, setText] = useState("");
  const getIdx = useFilterCourse();
  const liftUp = useUpCourse();
  const liftDown = useDownCourse();
  const deleteCourse = useDeleteCourse();

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
                  <PostCourseDesc item={item} />
                  <PostTextarea
                    idx={idx}
                    item={item}
                    text={text}
                    setText={setText}
                  />
                </div>
                <div>
                  <FiMinus
                    onClick={() => deleteCourse(item, idx)}
                    className="text-[26px] text-gray-04 -ml-5"
                  />
                </div>
              </div>
              {lists.length < 2 ? (
                <div className="p-3.5" />
              ) : (
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

export const ItemBtn = styled.span`
  &.non-clicked {
    color: #cccccc;
  }
  &:first-child {
    margin-right: 20px;
  }
  @media screen and (max-width: 414px) {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
