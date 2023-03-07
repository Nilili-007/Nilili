import { useDispatch } from "react-redux";
import { editMemo, filterCourse } from "../redux/modules/courseSlice";

const useHandleMemo = () => {
  const dispatch = useDispatch();

  const handleMemo = (item: any, idx: number, text: string, setText: any) => {
    const newInfo = {
      id: item.id,
      idx,
      memo: text,
    };

    if (item.memo === "") {
      setText("");
      dispatch(filterCourse(newInfo));
    } else {
      setText(item.memo);
      dispatch(filterCourse(newInfo));
      dispatch(editMemo(newInfo));
    }
  };

  return handleMemo;
};

export default useHandleMemo;
