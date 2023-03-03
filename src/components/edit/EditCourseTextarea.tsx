import { useDispatch } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/courseSlice";
import TextareaAutosize from "react-textarea-autosize";

const EditCourseTextarea = ({ idx, item, filteredId, text, setText }: any) => {
  const dispatch = useDispatch();

  const onFocusGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
  };

  const onFocusEditMemo = (item: any) => {
    setText(item.memo);
    const newMemo = {
      id: item.id,
      idx,
      memo: text,
    };
    dispatch(filterCourse(newMemo));
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
        item.memo ? () => onFocusEditMemo(item) : () => onFocusGetId(item, idx)
      }
      onBlur={() => onBlurAddMemo(item)}
      className="w-[402px] h-[28px] mt-5 px-2.5 py-2 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04 xs:w-[338px]"
    />
  );
};

export default EditCourseTextarea;
