import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMoreVert, MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { CommentType } from "./CommentInput";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import Swal from "sweetalert2";

interface CommentProps {
  comment: CommentType;
  index: number;
}

const Comment = ({ comment, index }: CommentProps) => {
  const [edit, setEdit] = useState(false);
  const editRef = useRef<HTMLButtonElement | any>();
  const currentUserId = authService.currentUser?.uid;
  const userImg: any = comment.profileImage;

  // 작성시간 나타내기
  const createdTime: any = comment.createdAt;
  const now = Date.now();
  const timeGap = (createTime: number) => {
    const miliSeconds = now - createTime;
    const beforeSeconds = miliSeconds / 1000;
    if (beforeSeconds < 60) return `방금 전`;
    const beforeMinutes = beforeSeconds / 60;
    if (beforeMinutes < 60) return `${Math.floor(beforeMinutes)}분 전`;
    const beforeHours = beforeMinutes / 60;
    if (beforeHours < 24) return `${Math.floor(beforeHours)}시간 전`;
    const beforeDays = beforeHours / 24;
    if (beforeDays < 32) return `${Math.floor(beforeDays)}일 전`;
    const beforeWeeks = beforeDays / 7;
    if (beforeWeeks < 5) return `${Math.floor(beforeWeeks)}주 전`;
    const beforeMonths = beforeDays / 30;
    if (beforeMonths < 12) return `${Math.floor(beforeMonths)}개월 전`;
    const beforeYears = beforeDays / 365;
    return `${Math.floor(beforeYears)}년 전`;
  };
  const nowTime = timeGap(createdTime);

  // 댓글 삭제
  const [deleteComment] = useDeleteCommentMutation();
  const deleteCommentHandler = (id: string | undefined) => {
    Swal.fire({
      title: "댓글 삭제",
      text: "정말 댓글을 삭제하시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 삭제할래요",
      cancelButtonText: "아니요, 취소할래요",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "댓글이 삭제되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
        deleteComment(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "삭제가 취소되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // 댓글 수정
  const [updateComment] = useUpdateCommentMutation();
  const [editComment, setEditComment] = useState<string | undefined>("");
  const updateCommentHandler = (id: string | undefined) => {
    if (!editComment?.trim()) {
      Swal.fire({
        icon: "warning",
        title: "댓글을 입력해 주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    updateComment({
      commentId: id,
      newComment: editComment,
      nickname: authService.currentUser?.displayName,
      profileImage: authService.currentUser?.photoURL,
    });
    Swal.fire({
      icon: "success",
      title: "댓글이 수정되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
    setEdit(false);
  };
  return (
    <div
      className="border-b sm:p-7 px-4 py-3"
      style={index % 2 === 0 ? { backgroundColor: "#ebebeb" } : undefined}
    >
      <div className="flex justify-between">
        <div className="flex items-center sm:gap-5 mb-2 md:mb-5 gap-3">
          <img
            src={
              userImg
                ? userImg
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="profile Image"
            className="object-fill sm:w-[36px] sm:h-[36px] w-6 h-6"
          />
          <h3 className="text-[16px] sm:text-[28px] leading-9 font-bold">
            {comment.nickname}
          </h3>
        </div>
        {/* 작성자만 보이는 메뉴 */}
        {currentUserId === comment.userId ? (
          <div className="flex sm:gap-5 justify-end w-1/3 items-start text-[14px] sm:text-[16px] gap-2 mt-1">
            <button
              onClick={() => {
                setEdit(!edit);
                setEditComment(comment.comment);
              }}
              className="flex font-semibold text-[#A0A4A8] hover:text-black"
            >
              {edit ? "취소" : "수정"}
            </button>
            <button
              className="font-semibold text-[#A0A4A8] hover:text-black"
              onClick={() => deleteCommentHandler(comment.id)}
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      {/* 수정할 때 input창 토글 */}
      {edit === false ? (
        <div className="w-full">
          <p className="w-30 sm:text-[22px] text-[16px] whitespace-pre-wrap break-words mb-5 xs:mb-2 h-12 sm:h-24">
            {comment.comment}
          </p>
          <p className="text-[16px] pb-2 sm:text-[20px]">{nowTime}</p>
        </div>
      ) : (
        <div className="pb-8">
          <textarea
            className="border-2 resize-none px-1 w-full xs:text-[16px] h-12 sm:h-24 focus:outline-black "
            placeholder="댓글을 입력해 주세요"
            onChange={(event) => setEditComment(event.target.value)}
            value={editComment}
          >
            {editComment}
          </textarea>
          <button
            className="bg-[#000000] text-white h-8 sm:h-10 px-3 py-1 float-right text-[12px] sm:text-[20px] disabled:opacity-40 mt-1"
            onClick={() => updateCommentHandler(comment.id)}
            ref={editRef}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
