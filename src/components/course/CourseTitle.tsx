import React, { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";

interface CourseTitleProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseTitle = ({
  setIsEdit,
  modalOpen,
  setModalOpen,
}: CourseTitleProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="flex justify-space">
        <div className="flex w-3/4 gap-5 items-center h-24 ">
          <h3 className="w-1/5 sm:w-1/7 md:w-1/11 text-lg md:text-xl text-center">
            지역명
          </h3>
          <h2 className="w-4/5 sm:w-6/7 md:w-10/11 text-2xl md:text-3xl ">
            제목
          </h2>
        </div>
        <div className="flex gap-3 justify-end w-1/3 items-center ">
          <MdOutlineMoreVert
            className="sm:hidden cursor-pointer"
            size={24}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <button
            className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center"
            onClick={() => setIsEdit(true)}
          >
            수정
          </button>
          <button
            className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center"
            onClick={() => setModalOpen(true)}
          >
            삭제
          </button>
        </div>
      </div>
      {menuOpen === true ? (
        <div className="absolute right-8 top-16 flex flex-col gap-y-1">
          <button
            className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden"
            onClick={() => setIsEdit(true)}
          >
            수정
          </button>
          <button
            className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden"
            onClick={() => setModalOpen(true)}
          >
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CourseTitle;
