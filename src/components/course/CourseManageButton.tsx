import React, { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../redux/modules/apiSlice";
import styled from "styled-components";

interface CourseManageButtonProps {
  paramId: string | undefined;
}

const CourseManageButton = ({ paramId }: CourseManageButtonProps) => {
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
    <>
      <div className="flex gap-3 ml-auto">
        <MdOutlineMoreVert
          className="sm:hidden cursor-pointer"
          size={24}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Button onClick={() => navigate(`/edit/${paramId}`)}>수정</Button>
        <div className="border-r border-gray-600 h-8 mx-0.5" />
        <Button onClick={() => deleteCommentHandler(paramId)}>삭제</Button>
      </div>
      {menuOpen === true ? (
        <div className="absolute right-8 top-16 flex flex-col gap-y-1">
          <Button onClick={() => navigate(`/edit/${paramId}`)}>수정</Button>
          <div className="border-r border-gray-600 h-8 mx-0.5" />
          <Button onClick={() => deleteCommentHandler(paramId)}>삭제</Button>
        </div>
      ) : null}
    </>
  );
};

export default CourseManageButton;

const Button = styled.button`
  height: 32px;
  padding: 0 8px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }
`;
