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
    console.log("get");
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
  console.log(idx, item);

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
      className="w-[402px] h-[28px] mt-5 px-2.5 py-2 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04 xs:w-[310px]"
    />
  );
};

export default PostMobileMemo;
