import TextareaAutosize from "react-textarea-autosize";
import { useCourse, useDebounce } from "../../hooks";
import { Dispatch, SetStateAction, useCallback } from "react";

interface CourseInfoProps {
  idx: number;
  item: CourseListType;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const CourseMemo = ({ idx, item, text, setText }: CourseInfoProps) => {
  const { filteredIdx } = useCourse();
  const { handleMemo } = useCourse();
  const { addMemo } = useCourse();

  const printValue = useCallback(
    useDebounce((value: string) => value, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    printValue(e.target.value);
    setText(e.target.value);
  };

  return (
    <TextareaAutosize
      autoFocus
      rows={1}
      placeholder={
        item.memo !== "" ? item.memo : "일정에 대한 메모나 후기를 적어보세요!"
      }
      value={idx === filteredIdx ? text : ""}
      onChange={idx === filteredIdx ? (e) => handleChange(e) : undefined}
      onFocus={() => handleMemo(item, idx, text, setText)}
      onBlur={() => addMemo(idx, text, setText)}
      className="w-full h-[28px] mt-5 px-2.5 py-2 border border-gray-04 resize-none text-black focus:outline-none placeholder:text-gray-04 xs:w-[102%] xs:mt-3 xs:px-2 xs:py-1.5"
    />
  );
};

export default CourseMemo;
