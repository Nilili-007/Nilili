import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replaceAllData } from "../../redux/modules/courseSlice";
import { useDeleteCourseMutation } from "../../redux/modules/apiSlice";
import styled from "styled-components";
import Swal from "sweetalert2";

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
      <div className="hidden sm:flex ml-auto float-right ">
        <Button onClick={() => navigate(`/edit/${paramId}`)}>수정</Button>
        <Button onClick={() => deleteCourseHandler(paramId)} className="delete">
          삭제
        </Button>
      </div>

      <div className="flex text-[12px] gap-1 float-right sm:hidden top-16 text-gray-04 hover:text-black">
        <button onClick={() => onClickEditing()}>수정</button>
        <button onClick={() => deleteCourseHandler(paramId)}>삭제</button>
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
`;
