import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteCourse,
  downCourse,
  editMemo,
  filterCourse,
  upCourse,
} from "../redux/modules/courseSlice";

const useCourse = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const getIdx = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    event.stopPropagation();
    dispatch(filterCourse(idx));
  };

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

  const liftUp = (idx: number) => {
    dispatch(upCourse(idx));
  };

  const liftDown = (idx: number) => {
    dispatch(downCourse(idx));
  };

  const handleMemo = (
    item: CourseListType,
    idx: number,
    text: string,
    setText: Dispatch<SetStateAction<string>>
  ) => {
    const newInfo = {
      idx,
      memo: text,
    };

    if (item.memo === "") {
      setText("");
      dispatch(filterCourse(idx));
    } else {
      setText(item.memo);
      dispatch(filterCourse(idx));
      dispatch(editMemo(newInfo));
    }
  };

  const addMemo = (
    idx: number,
    text: string,
    setText: Dispatch<SetStateAction<string>>
  ) => {
    const newMemo = {
      idx,
      memo: text,
    };
    if (text) {
      dispatch(editMemo(newMemo));
      setText("");
    }
  };

  return {
    lists,
    filteredIdx,
    getIdx,
    removeCourse,
    liftUp,
    liftDown,
    handleMemo,
    addMemo,
  };
};

export default useCourse;
