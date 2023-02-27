import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/modules/apiSlice";
import {
  CourseHashTag,
  CourseManageButton,
  LikeBtn,
  CommentDesc,
  CourseHeader,
  CourseMap,
  Share,
} from "../components/course";
import { authService } from "../utils/firebase";

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
            {courseData?.userID === authService.currentUser?.uid ? (
              <CourseManageButton paramId={paramId} course={courseData} />
            ) : null}
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                <img
                  src={courseData?.profileImage}
                  alt="profile Image"
                  className="object-fill w-[32px] h-[32px]"
                />
                <h3 className="text-3xl font-normal text-[#474C51]">
                  {courseData?.nickname}
                </h3>
              </div>
            </div>
            <p className="mt-6 text-lg text-gray-400">
              {date} {hours}:{seconds}
            </p>
            <CourseMap course={courseData} />
            <CourseHashTag course={courseData} />
            <Share />
            <LikeBtn paramId={paramId} course={courseData} />
            <CommentDesc paramId={paramId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
