import React, { useEffect, useRef } from "react";
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
  comment?: string | undefined;
}

const CommentInput = ({ comment, setComment }: CourseTitleProps) => {
  // const paramId = useParams().id;
  const submitRef = useRef<HTMLButtonElement | any>();
  const [addComment] = useAddCommentMutation();
  const commentValue = comment.trim();
  useEffect(() => {
    if (commentValue) {
      submitRef.current.disabled = false;
    }
    if (!commentValue) {
      submitRef.current.disabled = true;
    }
  }, [comment]);

  const commentSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      createdAt: Date.now(),
      userId: "dslfkjslk", //authService.currentUser?.uid,
      postId: "2dkAXpNHm2tCUunGU2lF", // useParams().id;
      nickname: "nickname", //authService.currentUser?.displayName,
      comment: commentValue,
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
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          ref={submitRef}
          disabled
        >
          등록
        </button>
      </form>
    </>
  );
};

export default CommentInput;
