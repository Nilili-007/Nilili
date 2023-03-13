import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/modules/apiSlice";
import {
  CourseHashTag,
  CourseManageButton,
  CommentDesc,
  CourseHeader,
  CourseMap,
  CourseMobile,
} from "../components/course";
import { authService } from "../utils/firebase";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import * as amplitude from "@amplitude/analytics-browser";
import { CreatedDate } from "../components/shared";

const Course = () => {
  const { data, isLoading } = useGetCourseQuery();
  const paramId = useParams().id;
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const courseData = filterData?.pop();
  const [filteredIdx, setFilteredIdx] = useState(0);

  useEffect(() => {
    amplitude.track("상세페이지 접속");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-screen h-full">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <SyncLoader color="#A0A4A8" margin={10} size={18} />
        </div>
      ) : (
        <div>
          <CourseHeader course={courseData} />
          <div className="w-[85%] resp1 py-10 m-auto">
            {courseData?.userID === authService.currentUser?.uid ? (
              <CourseManageButton paramId={paramId} course={courseData} />
            ) : null}
            <div className="flex items-center mb-3">
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
                    <CreatedDate createdAt={courseData?.createdAt} />
                  </p>
                </div>
              </div>
            </div>
            <p className="hidden sm:block mt-3 mb-6 text-lg text-gray-400">
              <CreatedDate createdAt={courseData?.createdAt} />
            </p>
            <CourseMap
              course={courseData}
              filteredIdx={filteredIdx}
              setFilteredIdx={setFilteredIdx}
            />
            <CourseMobile
              course={courseData}
              filteredIdx={filteredIdx}
              setFilteredIdx={setFilteredIdx}
            />
            <CourseHashTag course={courseData} />
            <CommentDesc paramId={paramId} courseData={courseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
