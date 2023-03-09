import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCourse, filterCourse } from "../redux/modules/courseSlice";
import { useState } from "react";

const useDeleteCourse = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const removeCourse = (idx: number) => {
    Swal.fire({
      title: `<p style="font-size: 20px;">일정에서 삭제하시겠습니까?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(filterCourse(idx));
        dispatch(deleteCourse(idx));
        setText("");
      }
    });
  };

  return removeCourse;
};

export default useDeleteCourse;
