import { Dispatch, SetStateAction } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

interface MobileProps {
  lists: CourseListType[];
  openCourse: boolean;
  setOpenCourse: Dispatch<SetStateAction<boolean>>;
}

const MobileCourseToggleBtn = ({
  lists,
  openCourse,
  setOpenCourse,
}: MobileProps) => {
  return (
    <div>
      {lists.length > 0 ? (
        <button
          onClick={() => setOpenCourse(!openCourse)}
          className="lg:hidden 3xl:hidden w-full h-16 border border-gray-03 mb-5 text-[18px] font-bold px-4"
        >
          <div className="lg:hidden 3xl:hidden flex justify-between items-center">
            {openCourse ? (
              <>
                전체 코스 닫기
                <BsChevronUp />
              </>
            ) : (
              <>
                전체 코스 보기
                <BsChevronDown />
              </>
            )}
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default MobileCourseToggleBtn;
