import { useEffect, useState } from "react";
import { PostCourseDesc } from "../../components/post/index";
import { EditCourseMobileMemo, EditCourseTextarea } from "./index";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiMinus } from "react-icons/fi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { ItemBtn } from "../post/PostCourse";
import {
  useDeleteCourse,
  useDownCourse,
  useFilterCourse,
  useUpCourse,
} from "../../hooks";

const EditCourseMobile = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState<any>("");
  const data = useSelector((state: any) => state.courseSlice.courseList);
  const [lists, setLists] = useState(data);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const getIdx = useFilterCourse();
  const liftUp = useUpCourse();
  const liftDown = useDownCourse();
  const deleteCourse = useDeleteCourse();

  useEffect(() => {
    setLists(data);
  }, [openCourse, data]);

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      <ItemCard>
        <div className="flex">
          <div>
            <h4 className="font-bold text-[20px]">
              {filteredIdx !== "" ? (
                <>
                  #{filteredIdx + 1} {lists[filteredIdx]?.name}
                </>
              ) : (
                "지도에서 여행지를 선택해보세요."
              )}
            </h4>
            <div className="w-full h-auto mt-1 text-gray-04">
              <p>{lists[filteredIdx]?.address}</p>
              <p>{lists[filteredIdx]?.road}</p>
              <p>{lists[filteredIdx]?.phone}</p>
            </div>
            {filteredIdx === -1 ? null : (
              <EditCourseMobileMemo
                idx={filteredIdx}
                item={lists[filteredIdx]}
                text={text}
                setText={setText}
              />
            )}
          </div>
          {filteredIdx ? (
            <div className="ml-auto">
              <FiMinus
                onClick={() => deleteCourse(lists[filteredIdx], filteredIdx)}
                className="-ml-6 -mt-1 text-[26px] text-gray-04"
              />
            </div>
          ) : null}
        </div>
      </ItemCard>

      {lists.length > 0 ? (
        <button
          onClick={() => setOpenCourse(!openCourse)}
          className="lg:hidden 3xl:hidden w-full h-14 border border-gray-03 mb-6 text-[20px] font-bold px-4"
        >
          <div className="lg:hidden 3xl:hidden flex justify-between items-center">
            {openCourse ? (
              <>
                전체 일정 접기
                <BsChevronUp />
              </>
            ) : (
              <>
                전체 일정 열기
                <BsChevronDown />
              </>
            )}
          </div>
        </button>
      ) : null}
      {lists.length > 0 ? (
        <>
          {openCourse && (
            <>
              {lists.map((item: any, idx: number) => {
                return (
                  <ItemCard key={idx} onClick={() => getIdx(item, idx)}>
                    <div className="flex">
                      <div>
                        <h4 className="font-bold text-[20px]">
                          #{idx + 1} {item.name}
                        </h4>
                        <PostCourseDesc item={item} />
                        <EditCourseTextarea
                          idx={idx}
                          item={item}
                          text={text}
                          setText={setText}
                        />
                      </div>
                      <div>
                        <FiMinus
                          onClick={() => deleteCourse(item, idx)}
                          className="-ml-6 -mt-1 text-[26px] text-gray-04"
                        />
                      </div>
                    </div>
                    {lists.length < 2 ? (
                      <div className="p-3.5" />
                    ) : (
                      <div className="flex text-2xl mt-1.5 -mb-2.5 float-right">
                        <ItemBtn
                          className={lists[0] === item ? "non-clicked" : ""}
                        >
                          <BsChevronUp onClick={() => liftUp(idx)} />
                        </ItemBtn>
                        <ItemBtn
                          className={
                            lists[lists.length - 1] === item
                              ? "non-clicked"
                              : ""
                          }
                        >
                          <BsChevronDown onClick={() => liftDown(idx)} />
                        </ItemBtn>
                      </div>
                    )}
                  </ItemCard>
                );
              })}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default EditCourseMobile;

const ItemCard = styled.div`
  border: 1px solid #cbcdd2;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
`;
