const SearchLanding = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <div className="flex justify-end items-center flex-wrap overflow-auto sm:h-[70vh] sm:w-full aspect-video  bg-no-repeat bg-cover bg-center sm:bg-fixed bg-[url('https://user-images.githubusercontent.com/117059420/217974553-ac861bb0-b64d-48a4-ad4c-092fcce81720.jpg')] ">
      <div className="mr-[15%]">
        <p className="mb-10  lg:text-[45px] sm:text-[35px] text-xl leading-loose  text-white font-bold ">
          <br />
          금수강산 명소 찾아
          <br />
          신명난 즐길거리 찾아
          <br />
          여행을 떠나보세요
        </p>
        <button
          className="hidden sm:block border-white border text-white font-medium mx-3  hover:bg-amber-500  text-xl w-48 py-2 my-auto"
          onClick={scrollToList}
        >
          검색하러 가기
        </button>
      </div>
    </div>
  );
};

export default SearchLanding;
