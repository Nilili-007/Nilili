import React, { useState } from "react";
import { MdOutlineMoreVert, MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

interface CourseTitleProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comment = ({ setModalOpen }: CourseTitleProps) => {
  const [editToggle, setEditToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <div className="relative border-b px-2 py-4">
      <div className="flex justify-between mb-2">
        <p className="font-bold text-md">닉네임</p>
        <div className="flex gap-3 justify-end w-1/3 items-center ">
          <MdOutlineMoreVert
            className="sm:hidden cursor-pointer"
            size={24}
            onClick={() => setEditToggle(!editToggle)}
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
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>
      {editToggle === true ? (
        <div className="absolute bg-gray-300  px-4 sm:px-5 py-2 rounded-xl right-6 top-8 flex flex-col gap-y-2 sm:hidden">
          <button
            onClick={() => {
              setEdit(!edit);
              setEditToggle(false);
            }}
          >
            {edit === true ? "취소" : "수정"}
          </button>
          <button>삭제</button>
        </div>
      ) : null}
      {edit === false ? (
        <p className="text-md">
          댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
        </p>
      ) : (
        <textarea
          className="border-2 resize-none px-2 py-1 w-full h-24"
          placeholder="댓글을 입력해 주세요"
        />
      )}
    </div>
  );
};

export default Comment;
