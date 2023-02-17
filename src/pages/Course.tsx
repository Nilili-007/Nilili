import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  CommentDesc,
} from "../components/course";
import { PostTitle, PostHashTag } from "../components/post";
import { useGetCourseQuery } from "../redux/modules/apiSlice";


const Course = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(true);
  const { data } = useGetCourseQuery();


  const paramId = useParams().id;

  const filterData = data?.filter((course) => course.id === paramId);
  const courseData = filterData?.pop();

  if (paramId === "1") {
    const test = data && data[0].id;
    if (test) {
      navigate(`/course/${test}`);
    }
  }
  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      {isEdit ? <PostTitle /> : <CourseTitle setIsEdit={setIsEdit} />}
      {isEdit ? (
        <>
          <PostHashTag />
          <button
            onClick={() => setIsEdit(false)}
            className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl float-right"
          >
            취소
          </button>
        </>
      ) : (
        <CourseHashTag />
      )}
      <LikeBtn paramId={paramId} course={courseData} />
      <CommentInput paramId={paramId} />
      <CommentDesc paramId={paramId} />
    </div>
  );
};

export default Course;
