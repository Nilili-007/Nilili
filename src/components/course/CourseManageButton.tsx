import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replaceAllData } from "../../redux/modules/courseSlice";
import { useDeleteCourseMutation } from "../../redux/modules/apiSlice";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDelete } from "../../hooks";

interface CourseManageButtonProps {
  paramId: string | undefined;
  course: any;
}

const CourseManageButton = ({ paramId, course }: CourseManageButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initList = JSON.parse(course?.courseList);

  const onClickEditing = () => {
    dispatch(replaceAllData(initList));
    navigate(`/edit/${paramId}`);
  };

  // 코스 삭제
  const [deleteCourse] = useDeleteCourseMutation();
  const { deleteContentHandler } = useDelete({
    target: "게시물",
    deleteFn: deleteCourse,
  });

  return (
    <>
      <div className="float-right text-[12px] sm:text-lg gap-1 sm:gap-0 text-gray-04 hover:text-black">
        <Button onClick={() => onClickEditing()}>수정</Button>
        <Button
          onClick={() => deleteContentHandler(paramId)}
          className="delete"
        >
          삭제
        </Button>
      </div>
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
  @media screen and (max-width: 768px) {
    width: auto;
    height: auto;
    color: #a0a4a8;
    border-width: 0;
    &:hover {
      color: black;
      background-color: transparent;
    }
  }
`;
