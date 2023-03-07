import { useDispatch } from "react-redux";
import { editMemo } from "../redux/modules/courseSlice";

const useAddMemo = () => {
  const dispatch = useDispatch();

  const addMemo = (item: any, idx: number, text: string, setText: any) => {
    const newMemo = {
      id: item.id,
      idx,
      memo: text,
    };
    if (text) {
      dispatch(editMemo(newMemo));
      setText("");
    }
  };

  return addMemo;
};

export default useAddMemo;
