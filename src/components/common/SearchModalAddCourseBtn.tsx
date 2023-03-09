const SearchModalAddCourseBtn = ({ setModalOpen }: any) => {
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full h-16 bg-white text-black border border-gray-04 font-bold mb-7 hover:text-white hover:bg-black xs:h-12 xs:text-[16px] sm:hidden xl:block xl:text-[16px] 2xl:text-lg px-1.5"
      >
        버튼을 눌러서 여행지를 추가해보세요!
      </button>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full h-12 md:h-14 bg-white text-black border border-gray-04 font-bold mb-7 hover:text-white hover:bg-black hidden sm:block xl:hidden sm:text-[13px] md:text-[16px] px-1.5"
      >
        여행지 추가하기
      </button>
    </>
  );
};

export default SearchModalAddCourseBtn;
