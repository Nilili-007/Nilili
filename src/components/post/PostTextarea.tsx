import { useDispatch, useSelector } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/courseSlice";
import TextareaAutosize from "react-textarea-autosize";

const PostTextarea = ({ idx, item, text, setText, setBoundsInfo }: any) => {
  const dispatch = useDispatch();
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const onFocusGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
    setBoundsInfo(item.bounds);
  };

  const onFocusEditMemo = (item: any, idx: number) => {
    setBoundsInfo(item.bounds);
    setText(item.memo);
    const newMemo = {
      id: item.id,
      idx,
      memo: text,
    };
    dispatch(filterCourse(newMemo));
    dispatch(editMemo(newMemo));
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

  return (
    <TextareaAutosize
      autoFocus
      rows={1}
      placeholder={
        item.memo ? item.memo : "일정에 대한 메모나 리뷰를 적어보세요!"
      }
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
      className="w-[402px] h-[28px] mt-5 px-2.5 py-2 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04 xs:w-[310px] xs:mt-3 xs:px-2 xs:py-1.5"
    />
  );
};

export default PostTextarea;
