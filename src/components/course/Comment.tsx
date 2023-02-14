import React, { useState } from "react";
import { MdOutlineMoreVert, MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { CommentType } from "./CommentInput";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const currentUserId = authService.currentUser?.uid;

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
    deleteComment(id);
    setModalOpen(false);
    alert("삭제되었습니다.");
  };

  // 댓글 수정
  const [updateComment] = useUpdateCommentMutation();
  const [editComment, setEditComment] = useState<string | undefined>("");
  const updateCommentHandler = (id: string | undefined) => {
    updateComment({ commentId: id, newComment: editComment });
    setEdit(false);
    alert("수정되었습니다.");
  };

  return (
    <div className="border-b px-2 py-4">
      {/* 댓글삭제 확인 모달 */}
      {modalOpen === true ? (
        <div className="bg-white fixed inset-y-[35%] inset-x-[10%] sm:inset-x-[20%] xl:inset-x-[30%] h-64 rounded-lg border-2 flex flex-col justify-center gap-y-10">
          <div className="flex items-center justify-center">
            <span className="text-lg">댓글을 정말 삭제하시겠습니까?</span>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl"
              onClick={() => deleteCommentHandler(comment.id)}
            >
              삭제
            </button>
            <button
              className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl"
              onClick={() => {
                setModalOpen(false);
                alert("취소되었습니다.");
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between mb-2">
        <p className="text-md">
          <span className="font-bold mr-3">{comment.nickname}</span> {nowTime}
        </p>
        {/* 작성자만 보이는 메뉴 */}
        {currentUserId === comment.userId ? (
          <div className="flex gap-3 justify-end w-1/3 items-center ">
            <MdOutlineMoreVert
              className="sm:hidden cursor-pointer"
              size={24}
              onClick={() => setMenuToggle(!menuToggle)}
            />
            <AiOutlineEdit
              onClick={() => {
                setEdit(!edit);
                setEditComment(comment.comment);
              }}
              size={20}
              className="hidden sm:flex"
            />
            <MdDelete
              size={20}
              className="hidden sm:flex"
              onClick={() => setModalOpen(true)}
            />
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
                setModalOpen(true);
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
        <p className="text-md">{comment.comment}</p>
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
