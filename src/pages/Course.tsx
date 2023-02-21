import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/modules/apiSlice";
import {
  CommentInput,
  CourseHashTag,
  CourseManageButton,
  LikeBtn,
  CommentDesc,
  CourseHeader,
  CourseMap,
  EditCourse,
} from "../components/course";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading } = useGetCourseQuery();
  const paramId = useParams().id;
  let date;
  let time;

  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const courseData = filterData?.pop();

  if (courseData?.createdAt !== undefined) {
    date = JSON.parse(courseData?.createdAt).substr(0, 10);
    time = JSON.parse(courseData?.createdAt).substr(11, 5);
  }

  if (isEdit) {
    return (
      <EditCourse course={courseData} setIsEdit={setIsEdit} paramId={paramId} />
    );
  }
  return (
    <div>
      {isLoading ? (
        <div className="h-screen m-40 text-3xl">Loading...</div>
      ) : (
        <div>
          <CourseHeader course={courseData} />
          <div className="w-[70%] py-10 m-auto">
            <div className="flex items-center">
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold">
                  {courseData?.nickname}님의 여행경로
                </h3>
                <p className="mt-2 text-lg text-gray-400">
                  {date} {time}
                </p>
              </div>
              <CourseManageButton paramId={paramId} setIsEdit={setIsEdit} />
            </div>
            <CourseMap course={courseData} />
            <CourseHashTag course={courseData} />
            <LikeBtn paramId={paramId} course={courseData} />
            <CommentInput paramId={paramId} />
            <CommentDesc paramId={paramId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
