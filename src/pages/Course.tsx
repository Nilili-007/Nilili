import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  CommentDesc,
} from "../components/course";
import EditCourse from "../components/course/EditCourse";
import { useGetCourseQuery } from "../redux/modules/apiSlice";

const Course = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useGetCourseQuery();

  const paramId = useParams().id;

  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const courseData = filterData?.pop();

  if (paramId === "1") {
    const test = data && data[0].id;
    if (test) {
      navigate(`/course/${test}`);
    }
  }
  return (
    <div>
      {isEdit ? (
        <EditCourse
          course={courseData}
          setIsEdit={setIsEdit}
          paramId={paramId}
        />
      ) : (
        <div className="w-11/12 md:w-3/4 m-auto">
          <CourseTitle
            course={courseData}
            paramId={paramId}
            setIsEdit={setIsEdit}
          />
          <CourseHashTag course={courseData} />
          <LikeBtn paramId={paramId} course={courseData} />
          <CommentInput paramId={paramId} />
          <CommentDesc paramId={paramId} />
        </div>
      )}
    </div>
  );
};

export default Course;
