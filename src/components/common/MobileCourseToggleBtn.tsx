import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const MobileCourseToggleBtn = ({ lists, openCourse, setOpenCourse }: any) => {
  return (
    <div>
      {lists.length > 0 ? (
        <button
          onClick={() => setOpenCourse(!openCourse)}
          className="lg:hidden 3xl:hidden w-full h-14 border border-gray-03 mb-6 text-[20px] font-bold px-4"
        >
          <div className="lg:hidden 3xl:hidden flex justify-between items-center">
            {openCourse ? (
              <>
                전체 일정 접기
                <BsChevronUp />
              </>
            ) : (
              <>
                전체 일정 열기
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
