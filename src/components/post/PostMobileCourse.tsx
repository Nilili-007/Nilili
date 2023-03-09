import { useState } from "react";
import {
  CourseOrderBtns,
  CoursePlaceInfo,
  CourseDeleteBtn,
  MobileCourseToggleBtn,
  CourseMemo,
} from "../common";
import { ItemCard } from "./PostCourse";
import { useCourse, useFilterCourse } from "../../hooks";

const PostMobileCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState("");
  const { lists } = useCourse();
  const { filteredIdx } = useCourse();

  const getIdx = useFilterCourse();

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      {lists?.length > 0 && lists[filteredIdx] ? (
        <ItemCard>
          <div className="flex">
            <div className="w-full">
              <CoursePlaceInfo
                lists={lists}
                item={lists[filteredIdx]}
                idx={filteredIdx}
              />
              <CourseMemo
                idx={filteredIdx}
                item={lists[filteredIdx]}
                text={text}
                setText={setText}
              />
            </div>
            <div className="ml-auto">
              <CourseDeleteBtn idx={filteredIdx} />
            </div>
          </div>
        </ItemCard>
      ) : (
        <>
          {lists.length === 0 ? null : (
            <div className="lg:hidden 3xl:hidden xs:border xs:border-gray-03 xs:p-5 xs:my-8">
              <span className="text-[18px] font-bold">
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
              {lists.map((item: CourseListType, idx: number) => {
                return (
                  <ItemCard key={idx} onClick={(event) => getIdx(event, idx)}>
                    <div className="flex">
                      <CoursePlaceInfo lists={lists} item={item} idx={idx} />
                      <CourseDeleteBtn idx={idx} />
                    </div>
                    <p className="mt-1 w-full ">{item.memo}</p>
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
