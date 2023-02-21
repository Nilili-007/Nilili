import React, { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../redux/modules/apiSlice";

interface CourseTitleProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  paramId: string | undefined;
  course: CourseType | undefined;
}

const CourseTitle = ({ setIsEdit, paramId, course }: CourseTitleProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 코스 삭제
  const [deleteCourse] = useDeleteCourseMutation();
  const deleteCommentHandler = (id: string | undefined) => {
    if (window.confirm("게시물을 정말 삭제하시겠습니까?")) {
      deleteCourse(id);
      alert("삭제되었습니다.");
      navigate("/");
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="flex justify-space">
        <div className="flex w-3/4 gap-5 items-center h-24 ">
          <div className="w-1/5 sm:w-1/7 md:w-1/11 text-lg md:text-xl text-center">
            {course?.location.map((location) => {
              return <p key={location}>{location}</p>;
            })}
          </div>

          <h2 className="w-4/5 sm:w-6/7 md:w-10/11 text-2xl md:text-3xl ">
            {course?.title}
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
            onClick={() => deleteCommentHandler(paramId)}
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
            onClick={() => deleteCommentHandler(paramId)}
          >
            삭제
          </button>
        </div>
      ) : null}
      <h3>작성자 : {course?.nickname}</h3>
    </div>
  );
};

export default CourseTitle;
