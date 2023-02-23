import React, { useState } from "react";
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
  const [menuToggle, setMenuToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
      }
    });
  };

  // 댓글 수정
  const [updateComment] = useUpdateCommentMutation();
  const [editComment, setEditComment] = useState<string | undefined>("");
  const updateCommentHandler = (id: string | undefined) => {
    updateComment({
      commentId: id,
      newComment: editComment,
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
      className="border-b p-5"
      style={index % 2 === 0 ? { backgroundColor: "#ebebeb" } : undefined}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-5 mb-5">
          <img
            src={
              userImg
                ? userImg
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="profile Image"
            className="object-fill w-[36px] h-[36px]"
          />
          <h3 className="text-[28px] leading-9 font-bold">
            {comment.nickname}
          </h3>
        </div>
        {/* 작성자만 보이는 메뉴 */}
        {currentUserId === comment.userId ? (
          <div className="flex gap-5 justify-end w-1/3 items-start ">
            <MdOutlineMoreVert
              className="sm:hidden cursor-pointer"
              size={24}
              onClick={() => setMenuToggle(!menuToggle)}
            />
            <button
              onClick={() => {
                setEdit(!edit);
                setEditComment(comment.comment);
              }}
              className="hidden sm:flex font-semibold text-[#A0A4A8] hover:text-black"
            >
              수정
            </button>
            <button
              className="hidden sm:flex font-semibold text-[#A0A4A8] hover:text-black"
              onClick={() => deleteCommentHandler(comment.id)}
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      {/* 모바일 화면일때의 드롭다운 메뉴 */}
      <div className="relative top-0">
        {menuToggle === true ? (
          <div className="absolute bg-gray-300 w-16 px-4 sm:px-5 py-2 rounded-xl right-2 flex flex-col gap-y-2 sm:hidden">
            <button
              onClick={() => {
                setEdit(!edit);
                setEditComment(comment.comment);
                setMenuToggle(false);
              }}
            >
              {edit === true ? "취소" : "수정"}
            </button>
            <button
              onClick={() => {
                deleteCommentHandler(comment.id);
                setMenuToggle(false);
              }}
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      {/* 수정할 때 input창 토글 */}
      {edit === false ? (
        <div className="w-full">
          <p className="w-30 text-[22px] whitespace-pre-wrap break-words mb-5">
            {comment.comment}
          </p>
          <p>{nowTime}</p>
        </div>
      ) : (
        <div>
          <textarea
            className="border-2 resize-none px-2 py-1 w-full h-24"
            placeholder="댓글을 입력해 주세요"
            onChange={(event) => setEditComment(event.target.value)}
            value={editComment}
          >
            {editComment}
          </textarea>
          <button
            className="bg-gray-300 w-20 px-4 sm:px-5 py-1 rounded-xl mt-1 flex justify-center "
            onClick={() => updateCommentHandler(comment.id)}
          >
            등록
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
