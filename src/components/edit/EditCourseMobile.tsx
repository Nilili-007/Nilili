import { useEffect, useState } from "react";
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
import { useFilterCourse } from "../../hooks";

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
          <div>
            {filteredIdx !== "" ? (
              <>
                <CoursePlaceInfo
                  lists={lists}
                  item={lists[filteredIdx]}
                  idx={filteredIdx}
                />
              </>
            ) : (
              <h4 className="font-bold text-black text-[20px] mt-[3px]">
                지도에서 여행지를 선택해보세요.
              </h4>
            )}
            {filteredIdx === "" || filteredIdx === -1 ? null : (
              <MobileCourseMemo
                idx={filteredIdx}
                item={lists[filteredIdx]}
                text={text}
                setText={setText}
              />
            )}
          </div>
          {filteredIdx ? (
            <div className="ml-auto">
              <CourseDeleteBtn item={lists[filteredIdx]} idx={filteredIdx} />
            </div>
          ) : null}
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
                  <ItemCard key={idx} onClick={() => getIdx(item, idx)}>
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
