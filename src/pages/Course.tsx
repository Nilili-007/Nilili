import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/modules/apiSlice";
import {
  CourseHashTag,
  CourseManageButton,
  CommentDesc,
  CourseHeader,
  CourseMap,
} from "../components/course";
import { authService } from "../utils/firebase";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import * as amplitude from "@amplitude/analytics-browser";

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
  useEffect(() => {
    amplitude.track("상세페이지 접속");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <SyncLoader color="#A0A4A8" margin={10} size={18} />
        </div>
      ) : (
        <div>
          <CourseHeader course={courseData} />
          <div className="w-[85%] md:w-[70%] py-10 m-auto">
            {courseData?.userID === authService.currentUser?.uid ? (
              <CourseManageButton paramId={paramId} course={courseData} />
            ) : null}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <img
                  src={courseData?.profileImage}
                  alt="profile Image"
                  className="object-fill w-[32px] h-[32px]"
                />
                <div className="flex flex-col">
                  <h3 className="text-[12px] sm:text-3xl font-normal text-[#474C51]">
                    {courseData?.nickname}
                  </h3>
                  <p className="text-[12px] sm:hidden caption text-gray-400">
                    {date} {hours}:{seconds}
                  </p>
                </div>
              </div>
            </div>
            <p className="hidden sm:block mt-6 text-lg text-gray-400">
              {date} {hours}:{seconds}
            </p>
            <CourseMap course={courseData} />
            <CourseHashTag course={courseData} />
            <CommentDesc paramId={paramId} courseData={courseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
