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

  // 클릭한 코스 및 마커의 인덱스 값 보내기
  const getIdx = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    event.stopPropagation();
    dispatch(filterCourse(idx));
  };

  // 코스 삭제하기
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

  // 코스 위로 올리기
  const liftUp = (idx: number) => {
    dispatch(upCourse(idx));
  };

  // 코스 아래로 내리기
  const liftDown = (idx: number) => {
    dispatch(downCourse(idx));
  };

  // 메모 작성
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

  // 메모 추가
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
