import { useEffect, useState } from "react";
import { ItemCard } from "../post/PostCourse";
import { useSelector } from "react-redux";
import {
  CourseOrderBtns,
  CourseMemo,
  CoursePlaceInfo,
  CourseDeleteBtn,
  SearchModalAddCourseBtn,
} from "../common";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { useParams } from "react-router-dom";
import { useFilterCourse } from "../../hooks";

const EditCourseInfo = ({ setModalOpen }: any) => {
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

  useEffect(() => {
    setLists(reduxLists);
  }, [reduxLists]);

  return (
    <div className="w-[35%] pl-7 float-right xs:hidden">
      <SearchModalAddCourseBtn setModalOpen={setModalOpen} />
      <div className="flex flex-col h-[932px] overflow-y-scroll ">
        {lists?.map((item: any, idx: any) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => getIdx(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <div className="w-full flex">
                <div className="w-full">
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
              <CourseOrderBtns lists={lists} item={item} idx={idx} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
};

export default EditCourseInfo;
