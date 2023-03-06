import { useDispatch, useSelector } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/courseSlice";
import TextareaAutosize from "react-textarea-autosize";

const PostMobileMemo = ({ text, setText, item, idx }: any) => {
  const dispatch = useDispatch();
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const onFocusGetId = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
    item: any,
    idx: number
  ) => {
    event.stopPropagation();
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
  };

  const onBlurAddMemo = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
    item: any,
    idx: number
  ) => {
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

  const onFocusEditMemo = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
    item: any,
    idx: number
  ) => {
    event.stopPropagation();

    dispatch(filterCourse(item.id));
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
      placeholder={
        item.memo ? item.memo : "일정에 대한 메모나 리뷰를 적어보세요!"
      }
      value={idx === filteredIdx ? text : ""}
      onChange={
        idx === filteredIdx ? (e) => setText(e.target.value) : undefined
      }
      onFocus={
        item.memo
          ? (event) => onFocusEditMemo(event, item, idx)
          : (event) => onFocusGetId(event, item, idx)
      }
      onBlur={(event) => onBlurAddMemo(event, item, idx)}
      className="w-[310px] h-[24px] mt-3 px-2 py-1.5 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04"
    />
  );
};

export default PostMobileMemo;
