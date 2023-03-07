import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteCourse,
  deleteMemo,
  filterCourse,
} from "../redux/modules/courseSlice";
import { useState } from "react";

const useDeleteCourse = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const removeCourse = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    Swal.fire({
      title: "일정에서 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 삭제할래요",
      cancelButtonText: "아니요, 취소할래요",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(filterCourse(newInfo));
        dispatch(deleteCourse(idx));
        dispatch(deleteMemo(item.id));
        setText("");
      }
    });
  };

  return removeCourse;
};

export default useDeleteCourse;
