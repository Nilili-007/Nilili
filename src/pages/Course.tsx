import { useState } from "react";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
} from "../components/course";
import { PostTitle, PostHashTag } from "../components/post";
import { useSelector } from "react-redux";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const category = useSelector((state) => {
    console.log(state);
    return state;
  });
  console.log(category);

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
