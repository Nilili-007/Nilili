import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  CourseOrderBtns,
  CourseMemo,
  CoursePlaceInfo,
  CourseDeleteBtn,
  MobileCourseMemo,
  MobileCourseToggleBtn,
} from "../common";

const PostMobileCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState("");
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      {lists?.length > 0 && lists[filteredIdx] ? (
        <ItemCard>
          <div className="flex">
            <div>
              <CoursePlaceInfo
                lists={lists}
                item={lists[filteredIdx]}
                idx={filteredIdx}
              />
              <MobileCourseMemo
                idx={filteredIdx}
                item={lists[filteredIdx]}
                text={text}
                setText={setText}
              />
            </div>
            <div className="ml-auto">
              <CourseDeleteBtn item={lists[filteredIdx]} idx={filteredIdx} />
            </div>
          </div>
        </ItemCard>
      ) : (
        <>
          {lists.length === 0 ? null : (
            <div className="lg:hidden 3xl:hidden xs:border xs:border-gray-03 xs:p-5 xs:my-8">
              <span className="text-[20px] font-bold">
                지도에서 여행지를 선택해보세요.
              </span>
            </div>
          )}
        </>
      )}
      <MobileCourseToggleBtn
        lists={lists}
        openCourse={openCourse}
        setOpenCourse={setOpenCourse}
      />
      {lists.length > 0 ? (
        <>
          {openCourse && (
            <>
              {lists.map((item: any, idx: number) => {
                return (
                  <ItemCard key={idx}>
                    <div className="flex">
                      <div>
                        <CoursePlaceInfo lists={lists} item={item} idx={idx} />
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
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default PostMobileCourse;

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
