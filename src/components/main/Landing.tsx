const Landing = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  console.log(window.innerHeight);

  return (
    <>
      <img
        className="relative brightness-50 h-screen w-full mx-auto my-0"
        alt="메인사진"
        src="/assets/traditionalhouse.jpg"
      ></img>
      <div className=" absolute bottom-1/4 left-[20%]">
        <p className="  min-w-[390px] mb-10 text-[35px] text-white font-bold leading-[60px]">
          늴리리의 추천 코스를 따라
          <br />
          금수강산 명소 찾아
          <br />
          신명난 즐길거리 찾아
          <br />
          여행을 떠나보세요
        </p>
        <button
          className=" border-white border text-white font-medium  hover:bg-amber-500  text-2xl w-48 py-2 my-auto"
          onClick={scrollToList}
        >
          코스보기
        </button>
      </div>
    </>
  );
};

export default Landing;
