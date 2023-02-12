import React, { useRef, useState } from "react";
import { useAddCommentMutation } from "../../redux/modules/apiSlice";

interface CourseTitleProps {
  comment: string;
  setComment: any;
}
export interface CommentType {
  createdAt?: number;
  id?: string;
  userId?: string;
  postId?: string;
  nickname?: string;
  comment?: string;
}

const CommentInput = ({ comment, setComment }: CourseTitleProps) => {
  // const paramId = useParams().id;
  const [addComment] = useAddCommentMutation();

  const commentSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      createdAt: Date.now(),
      userId: "dslfkjslk", //authService.currentUser?.uid,
      postId: "2dkAXpNHm2tCUunGU2lF", // useParams().id;
      nickname: "nickname", //authService.currentUser?.displayName,
      comment,
    };
    addComment(newComment);
    setComment("");
  };
  return (
    <>
      <form className="mb-20" onSubmit={commentSubmitHandler}>
        <textarea
          className="border-2 resize-none px-2 py-1 w-full h-28"
          placeholder="댓글을 입력해 주세요."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className="bg-gray-300 w-20 px-4 sm:px-5 py-1 rounded-xl float-right mt-1">
          등록
        </button>
      </form>
    </>
  );
};

export default CommentInput;
