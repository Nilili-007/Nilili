import { useDispatch } from "react-redux";
import { editMemo, filterCourse } from "../redux/modules/courseSlice";
import { Dispatch, SetStateAction } from "react";

const useHandleMemo = () => {
  const dispatch = useDispatch();

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

  return handleMemo;
};

export default useHandleMemo;
