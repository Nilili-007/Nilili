import { useNavigate } from "react-router-dom";

const Landing = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <>
      <img
        className="relative brightness-50 h-[70vh] w-full mx-auto my-0"
        alt="메인사진"
        src="/assets/traditionalhouse.jpg"
      ></img>
      <div className=" absolute bottom-1/3 right-[20%]">
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
          className=" border-white border text-white font-medium mx-3  hover:bg-amber-500  text-xl w-48 py-2 my-auto"
          onClick={scrollToList}
        >
          아래로 스크롤
        </button>
        <button
          className=" border-white border text-white font-medium  hover:bg-amber-500  text-xl w-48 py-2 my-auto"
          onClick={() => {
            navigate("/search");
          }}
        >
          코스보기
        </button>
      </div>
    </>
  );
};

export default Landing;
