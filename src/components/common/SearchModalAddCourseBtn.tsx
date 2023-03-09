const SearchModalAddCourseBtn = ({ setModalOpen }: any) => {
  return (
    <button
      onClick={() => setModalOpen(true)}
      className="w-full h-16 bg-white text-black border border-gray-03 text-lg font-bold mb-7 hover:text-white hover:bg-black xs:h-16 xs:text-[16px]"
    >
      버튼을 눌러서 여행지를 추가해보세요!
    </button>
  );
};

export default SearchModalAddCourseBtn;
