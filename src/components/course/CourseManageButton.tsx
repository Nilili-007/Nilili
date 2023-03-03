import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replaceAllData } from "../../redux/modules/courseSlice";
import { useDeleteCourseMutation } from "../../redux/modules/apiSlice";
import { storage } from "../../utils/firebase";
import styled from "styled-components";
import { MdOutlineMoreVert } from "react-icons/md";
import Swal from "sweetalert2";

interface CourseManageButtonProps {
  paramId: string | undefined;
  course: any;
}

const CourseManageButton = ({ paramId, course }: CourseManageButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initList = JSON.parse(course?.courseList);

  const onClickEditing = () => {
    dispatch(replaceAllData(initList));
    navigate(`/edit/${paramId}`);
  };

  // 코스 삭제
  const [deleteCourse] = useDeleteCourseMutation();
  const deleteCourseHandler = (id: string | undefined) => {
    Swal.fire({
      title: "게시물 삭제",
      text: "정말 게시물을 삭제하시겠어요?",
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
          title: "게시물이 삭제되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
        deleteCourse(id);
        navigate("/");
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

  return (
    <>
      <div className="flex ml-auto float-right">
        <MdOutlineMoreVert
          className="sm:hidden cursor-pointer"
          size={24}
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <Button onClick={() => navigate(`/edit/${paramId}`)}>수정</Button>
        <Button onClick={() => deleteCourseHandler(paramId)} className="delete">
          삭제
        </Button>
      </div>
      {menuOpen === true ? (
        <div className="absolute right-8 top-16 flex flex-col gap-y-1">
          <Button onClick={() => onClickEditing()}>수정</Button>
          <div className="border-r border-gray-600 h-8 mx-0.5" />
          <Button onClick={() => deleteCourseHandler(paramId)}>삭제</Button>
        </div>
      ) : null}
    </>
  );
};

export default CourseManageButton;

const Button = styled.button`
  width: 70px;
  height: 40px;
  padding: 0 8px;
  border: 1px solid #a0a4a8;
  margin-bottom: 32px;
  cursor: pointer;
  color: #a0a4a8;
  &:hover {
    background: black;
    color: white;
  }
  &.delete {
    border-left-width: 0px;
  }
`;
