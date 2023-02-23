import React, { useEffect, useRef, useState } from "react";
import { useAddCommentMutation } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { CommentProps } from "./CommentDesc";

export interface CommentType {
  createdAt?: number;
  id?: string;
  userId?: string;
  postId?: string;
  nickname?: string;
  comment?: string | undefined;
  profileImage: string;
}

const CommentInput = ({ paramId }: CommentProps) => {
  const [comment, setComment] = useState("");
  const submitRef = useRef<HTMLButtonElement | any>();
  const [addComment] = useAddCommentMutation();
  const commentValue = comment.trim();
  const userImg: any = authService.currentUser?.photoURL;
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
      profileImage: authService.currentUser?.photoURL,
    };
    addComment(newComment);
    setComment("");
  };
  return (
    <>
      <form className="mb-20" onSubmit={commentSubmitHandler}>
        <div className="p-5">
          <div className="flex items-middle gap-5 mb-5">
            <img
              src={userImg}
              alt="profile Image"
              className="object-fill w-[36px] h-[36px]"
            />
            <h3 className="text-[28px] font-bold">
              {authService.currentUser?.displayName}
            </h3>
          </div>
          <textarea
            wrap="hard"
            cols={20}
            className="border-2 resize-none px-2 py-1 w-full h-28 text-[22px]"
            placeholder={
              authService.currentUser
                ? "댓글을 입력해 주세요."
                : "로그인 한 이용자만 이용하실 수 있습니다."
            }
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button
          className="w-[92px] h-[60px] bg-[#000000] text-white font-bold py-4 px-5 disabled:opacity-40 float-right"
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
