import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CourseOrderBtns,
  CourseMemo,
  CoursePlaceInfo,
  CourseDeleteBtn,
  MobileCourseMemo,
  MobileCourseToggleBtn,
} from "../common";
import { ItemCard } from "./PostCourse";
import { useFilterCourse } from "../../hooks";

const PostMobileCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState("");
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const getIdx = useFilterCourse();

  lists.map((item: any) => console.log(item.name, ":", item.memo));

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
                  <ItemCard key={idx} onClick={() => getIdx(item, idx)}>
                    <div className="flex">
                      <CoursePlaceInfo lists={lists} item={item} idx={idx} />
                      <CourseDeleteBtn item={item} idx={idx} />
                    </div>
                    {/* <CourseMemo
                          idx={idx}
                          item={item}
                          text={text}
                          setText={setText}
                        /> */}
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
