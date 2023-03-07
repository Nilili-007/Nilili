import { useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { useAddMemo, useHandleMemo } from "../../hooks";

const MobileCourseMemo = ({ text, setText, item, idx }: any) => {
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  const handleMemo = useHandleMemo();
  const addMemo = useAddMemo();

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
      onFocus={() => handleMemo(item, idx, text, setText)}
      onBlur={() => addMemo(item, idx, text, setText)}
      className="w-[310px] h-[24px] mt-3 px-2 py-1.5 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04"
    />
  );
};

export default MobileCourseMemo;
