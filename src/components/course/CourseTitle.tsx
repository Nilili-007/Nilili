import React, { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";

const CourseTitle = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="flex justify-space">
        <div className="flex w-3/4 gap-5 items-center h-24 ">
          <h3 className="w-1/6 sm:w-1/10 text-lg">지역명</h3>
          <h2 className="md:w-5/6 text-2xl md:text-3xl ">제목</h2>
        </div>
        <div className="flex gap-3 justify-end w-1/3 items-center ">
          <MdOutlineMoreVert
            className="sm:hidden"
            size={24}
            onClick={() => setOpen(!open)}
          />
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center">
            수정
          </button>
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center">
            삭제
          </button>
        </div>
      </div>
      {open === true ? (
        <div className="absolute right-8 top-16 flex flex-col gap-y-1">
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden">
            수정
          </button>
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden">
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CourseTitle;
