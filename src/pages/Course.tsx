import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  CommentDesc,
} from "../components/course";
import { PostTitle, PostHashTag } from "../components/post";
import { useGetLikesQuery } from "../redux/modules/apiSlice";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const paramId = useParams().id;
  const { data } = useGetLikesQuery();
  const filterData = data?.filter((course) => course.id === paramId);
  const courseData = filterData?.pop();

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
