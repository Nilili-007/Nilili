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
} from "../components/course";

const Course = () => {
  const { data, isLoading } = useGetCourseQuery();
  const paramId = useParams().id;
  let date;
  let hours;
  let seconds;
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const courseData = filterData?.pop();

  if (courseData?.createdAt !== undefined) {
    date = JSON.parse(courseData?.createdAt).substr(0, 10);
    hours = Number(JSON.parse(courseData?.createdAt).substr(11, 2)) + 9;
    seconds = JSON.parse(courseData?.createdAt).substr(14, 2);
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
                  {date} {hours}:{seconds}
                </p>
              </div>
              <CourseManageButton paramId={paramId} />
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
