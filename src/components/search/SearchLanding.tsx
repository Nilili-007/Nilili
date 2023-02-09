const SearchLanding = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <div className="hidden sm:block relative">
      <img
        className=" brightness-50 sm:h-[70vh] sm:w-full aspect-video  mx-auto"
        alt="메인사진"
        src="/assets/water.jpg"
      ></img>
      <div className=" absolute bottom-[20%] right-[20%]">
        <p className="mb-10 xl:text-[55px] lg:text-[45px] sm:text-[35px]  text-white font-bold leading-[70px]">
          <br />
          금수강산 명소 찾아
          <br />
          신명난 즐길거리 찾아
          <br />
          여행을 떠나보세요
        </p>
        <button
          className=" border-white bg-slate-500 border text-white font-medium mx-3  hover:bg-amber-500  text-xl w-48 py-2 my-auto"
          onClick={scrollToList}
        >
          검색하러 가기
        </button>
      </div>
    </div>
  );
};

export default SearchLanding;
