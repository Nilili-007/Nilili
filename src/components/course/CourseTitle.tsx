import React from "react";
import { MdOutlineMoreVert } from "react-icons/md";

const CourseTitle = () => {
  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      <div className="flex justify-space">
        <div className="flex w-3/4 gap-5 md:gap-10 items-center h-24 ">
          <h3 className="w-1/6 sm:w-1/10">지역명</h3>
          <h2 className="md:w-5/6 text-2xl md:text-3xl ">제목</h2>
        </div>
        <div className="flex gap-3 justify-end w-1/3 items-center ">
          <MdOutlineMoreVert className="sm:hidden" size={24} />
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center">
            수정
          </button>
          <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl hidden sm:flex justify-center">
            삭제
          </button>
        </div>
      </div>
      <div className="absolute right-2 top-16 flex flex-col gap-y-1">
        <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden">
          수정
        </button>
        <button className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl sm:hidden">
          삭제
        </button>
      </div>
      <div className="flex gap-3">
        <h3 className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl flex justify-center">
          #해시태그
        </h3>
      </div>
    </div>
  );
};

export default CourseTitle;
