import { useDispatch, useSelector } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/temporarySlice";
import TextareaAutosize from "react-textarea-autosize";

const PostTextarea = ({ idx, item, text, setText, setBoundsInfo }: any) => {
  const dispatch = useDispatch();

  const filteredIdx = useSelector(
    (state: any) => state.temporarySlice.filteredIdx
  );

  const onFocusGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
    setBoundsInfo(item.bounds);
  };

  const onBlurAddMemo = (item: any, idx: number) => {
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

  const onFocusEditMemo = (item: any, idx: number) => {
    dispatch(filterCourse(item.id));
    setBoundsInfo(item.bounds);
    setText(item.memo);
    const newMemo = {
      id: item.id,
      idx,
      memo: text,
    };
    dispatch(editMemo(newMemo));
  };

  return (
    <TextareaAutosize
      autoFocus
      rows={1}
      placeholder={item.memo ? item.memo : "자유롭게 메모를 남겨보세요."}
      value={idx === filteredIdx ? text : ""}
      onChange={
        idx === filteredIdx ? (e) => setText(e.target.value) : undefined
      }
      onFocus={
        item.memo
          ? () => onFocusEditMemo(item, idx)
          : () => onFocusGetId(item, idx)
      }
      onBlur={() => onBlurAddMemo(item, idx)}
      className="w-full mt-3 ml-3 py-1 resize-none text-black focus:outline-none placeholder:text-gray-400"
    />
  );
};

export default PostTextarea;
