import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CourseOrderBtns,
  CoursePlaceInfo,
  CourseDeleteBtn,
  MobileCourseToggleBtn,
  CourseMemo,
} from "../common";
import { useFilterCourse } from "../../hooks";
import { ItemCard } from "../post/PostCourse";

const EditCourseMobile = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [text, setText] = useState<any>("");
  const data = useSelector((state: any) => state.courseSlice.courseList);
  const [lists, setLists] = useState(data);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const getIdx = useFilterCourse();

  useEffect(() => {
    setLists(data);
  }, [openCourse, data]);

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      <ItemCard>
        <div className="flex">
          {filteredIdx !== "" ? (
            <>
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
                <CourseDeleteBtn item={lists[filteredIdx]} idx={filteredIdx} />
              </div>
            </>
          ) : (
            <h4 className="font-bold text-black text-[18px] mt-[3px]">
              지도에서 여행지를 선택해보세요.
            </h4>
          )}
        </div>
      </ItemCard>
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
                  <ItemCard
                    key={idx}
                    onClick={(event) => getIdx(event, item, idx)}
                  >
                    <div className="flex">
                      <CoursePlaceInfo lists={lists} item={item} idx={idx} />
                      <CourseDeleteBtn item={item} idx={idx} />
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

export default EditCourseMobile;
