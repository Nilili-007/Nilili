import React, { useState } from "react";
import { MdOutlineMoreVert, MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { CommentType } from "./CommentInput";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";

interface CourseTitleProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comment: CommentType;
}

const Comment = ({ setModalOpen, comment }: CourseTitleProps) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const commnetId = comment.id;

  // 댓글 삭제
  const [deleteComment] = useDeleteCommentMutation();
  const deleteCommentHandler = (id: string | undefined) => {
    let confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm === true) {
      deleteComment(id);
    }
  };

  // 댓글 수정
  const [updateComment] = useUpdateCommentMutation();
  const [editComment, setEditComment] = useState("");
  const updateCommentHandler = (id: string | undefined) => {
    updateComment({ commentId: id, newComment: editComment });
    console.log(id, editComment);
    setEdit(false);
  };

  return (
    <div className="relative border-b px-2 py-4">
      <div className="flex justify-between mb-2">
        <p className="font-bold text-md">{comment.nickname}</p>
        <div className="flex gap-3 justify-end w-1/3 items-center ">
          <MdOutlineMoreVert
            className="sm:hidden cursor-pointer"
            size={24}
            onClick={() => setMenuToggle(!menuToggle)}
          />
          <AiOutlineEdit
            onClick={() => {
              setEdit(!edit);
            }}
            size={20}
            className="hidden sm:flex"
          />
          <MdDelete
            size={20}
            className="hidden sm:flex"
            onClick={() => deleteCommentHandler(comment.id)}
          />
        </div>
      </div>
      {menuToggle === true ? (
        <div className="absolute bg-gray-300  px-4 sm:px-5 py-2 rounded-xl right-6 top-8 flex flex-col gap-y-2 sm:hidden">
          <button
            onClick={() => {
              setEdit(!edit);
              setMenuToggle(false);
            }}
          >
            {edit === true ? "취소" : "수정"}
          </button>
          <button>삭제</button>
        </div>
      ) : null}
      {edit === false ? (
        <p className="text-md">{comment.comment}</p>
      ) : (
        <div>
          <textarea
            className="border-2 resize-none px-2 py-1 w-full h-24"
            placeholder="댓글을 입력해 주세요"
            onChange={(event) => setEditComment(event.target.value)}
          />
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
