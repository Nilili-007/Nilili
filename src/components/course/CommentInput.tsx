import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";

interface CourseTitleProps {
  comment: string;
  setComment: any;
  paramId: string | undefined;
}
export interface CommentType {
  createdAt?: number;
  id?: string;
  userId?: string;
  postId?: string;
  nickname?: string;
  comment?: string | undefined;
}

const CommentInput = ({ comment, setComment, paramId }: CourseTitleProps) => {
  const submitRef = useRef<HTMLButtonElement | any>();
  const [addComment] = useAddCommentMutation();
  const commentValue = comment.trim();
  useEffect(() => {
    if (commentValue) {
      submitRef.current.disabled = false;
    }
    if (!commentValue || !authService.currentUser) {
      submitRef.current.disabled = true;
    }
  }, [comment]);

  const commentSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      createdAt: Date.now(),
      userId: authService.currentUser?.uid,
      postId: paramId,
      nickname: authService.currentUser?.displayName,
      comment: commentValue,
    };
    addComment(newComment);
    setComment("");
    console.log(authService.currentUser?.displayName);
  };
  return (
    <>
      <form className="mb-20" onSubmit={commentSubmitHandler}>
        <textarea
          className="border-2 resize-none px-2 py-1 w-full h-28"
          placeholder={
            authService.currentUser
              ? "댓글을 입력해 주세요."
              : "로그인 한 이용자만 이용하실 수 있습니다."
          }
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
