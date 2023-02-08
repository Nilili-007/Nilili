import React from "react";
import Comment from "./Comment";

interface CourseTitleProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ setModalOpen }: CourseTitleProps) => {
  return (
    <>
      <form className="mb-20">
        <textarea
          className="border-2 resize-none px-2 py-1 w-full h-28"
          placeholder="댓글을 입력해 주세요"
        />
        <button className="bg-gray-300 w-20 px-4 sm:px-5 py-1 rounded-xl float-right mt-1">
          등록
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold">댓글(3)</h2>
        <Comment setModalOpen={setModalOpen} />
        <Comment setModalOpen={setModalOpen} />
        <Comment setModalOpen={setModalOpen} />
      </div>
    </>
  );
};

export default CommentInput;
