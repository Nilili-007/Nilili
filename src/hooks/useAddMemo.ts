import { useDispatch } from "react-redux";
import { editMemo } from "../redux/modules/courseSlice";
import { Dispatch, SetStateAction } from "react";

const useAddMemo = () => {
  const dispatch = useDispatch();

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

  return addMemo;
};

export default useAddMemo;
