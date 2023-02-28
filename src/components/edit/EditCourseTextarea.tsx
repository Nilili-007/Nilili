import React from "react";
import { useDispatch } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/temporarySlice";
import TextareaAutosize from "react-textarea-autosize";

const EditCourseTextarea = ({ item, filteredId, text, setText }: any) => {
  const dispatch = useDispatch();

  const onFocusGetId = (item: any) => {
    dispatch(filterCourse(item.id));
    // setBoundsInfo(item.bounds);
  };

  const onFocusEditMemo = (item: any) => {
    dispatch(filterCourse(item.id));
    // setBoundsInfo(item.bounds);
    setText(item.memo);
    const newMemo = {
      id: item.id,
      memo: text,
    };
    dispatch(editMemo(newMemo));
  };

  const onBlurAddMemo = (item: any) => {
    const newMemo = {
      id: item.id,
      memo: text,
    };
    if (text) {
      dispatch(editMemo(newMemo));
      setText("");
    }
  };

  return (
    <TextareaAutosize
      autoFocus
      rows={1}
      placeholder={item.memo ? item.memo : "자유롭게 메모를 남겨보세요."}
      value={item.id === filteredId ? text : null}
      onChange={
        item.id === filteredId ? (e) => setText(e.target.value) : undefined
      }
      onFocus={
        item.memo ? () => onFocusEditMemo(item) : () => onFocusGetId(item)
      }
      onBlur={() => onBlurAddMemo(item)}
      className="w-full mt-3 ml-3 py-1 resize-none text-black focus:outline-none placeholder:text-gray-400"
    />
  );
};

export default EditCourseTextarea;
