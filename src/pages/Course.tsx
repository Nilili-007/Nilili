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

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const paramId = useParams().id;

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
      <LikeBtn paramId={paramId} />
      <CommentInput paramId={paramId} />
      <CommentDesc paramId={paramId} />
    </div>
  );
};

export default Course;
