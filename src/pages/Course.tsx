import { useEffect, useState } from "react";
import CommentInput from "../components/course/CommentInput";
import CourseHashTag from "../components/course/CourseHashTag";
import CourseTitle from "../components/course/CourseTitle";
import LikeBtn from "../components/course/LikeBtn";
import PostTitle from "../components/post/PostTitle";
import PostHashTag from "../components/post/PostHashTag";
import Comment from "../components/course/Comment";
import { useGetCommentQuery } from "../redux/modules/apiSlice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../utils/firebase";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { data } = useGetCommentQuery();

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
      <CommentInput comment={comment} setComment={setComment} />
      <div className="mb-10">
        <h2 className="text-xl font-bold">댓글({data?.length})</h2>
        {data?.map((comment) => {
          return <Comment setModalOpen={setModalOpen} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Course;
