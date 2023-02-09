import { useState } from "react";
import CommentInput from "../components/course/CommentInput";
import CourseHashTag from "../components/course/CourseHashTag";
import CourseTitle from "../components/course/CourseTitle";
import LikeBtn from "../components/course/LikeBtn";
import PostTitle from "../components/post/PostTitle";
import PostHashTag from "../components/post/PostHashTag";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      {isEdit ? (
        <PostTitle />
      ) : (
        <CourseTitle
          setIsEdit={setIsEdit}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
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
      <LikeBtn />
      <CommentInput setModalOpen={setModalOpen} />
    </div>
  );
};

export default Course;
