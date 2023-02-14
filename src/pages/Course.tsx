import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  Comment,
  CommentDesc,
} from "../components/course";
import { PostTitle, PostHashTag } from "../components/post";
import { useGetCommentQuery } from "../redux/modules/apiSlice";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [desc, setDesc] = useState(true);
  const { data, isLoading, isError, error } = useGetCommentQuery();
  const paramId = useParams().id;
  const filterData = data?.filter((comment) => comment.postId === paramId);

  if (isError) {
    console.log(error);
  }

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
      <CommentInput
        comment={comment}
        setComment={setComment}
        paramId={paramId}
      />
      <div className="mb-10">
        <div>
          <input
            id="desc"
            type="button"
            onClick={() => {
              setDesc(true);
            }}
            value="최신순"
            style={
              desc === true
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
            className="mr-2 mb-4"
          />
          <input
            id="asc"
            type="button"
            onClick={() => {
              setDesc(false);
            }}
            value="오래된 순"
            style={
              desc === false
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
          />
        </div>
        <h2 className="text-xl font-bold">댓글({filterData?.length})</h2>
        {isLoading ? (
          <h3 className="text-xl">댓글을 불러오고 있습니다 :-) </h3>
        ) : null}
        {desc === true ? (
          <CommentDesc paramId={paramId} />
        ) : (
          filterData?.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })
        )}
      </div>
    </div>
  );
};

export default Course;
