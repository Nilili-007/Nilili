import { useNavigate } from "react-router-dom";

const Landing = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end items-center flex-wrap overflow-auto sm:h-[70vh] sm:w-full aspect-video  bg-no-repeat bg-cover bg-center sm:bg-fixed bg-[url('https://user-images.githubusercontent.com/117059420/217982337-b6b4d259-e3d2-4535-8e62-ca8d5d27082f.jpg')] ">
        <div className="mr-[15%]">
          <p className="mb-10  lg:text-[45px] sm:text-[35px] text-xl leading-loose  text-white font-bold ">
            <br />
            금수강산 명소 찾아
            <br />
            신명난 즐길거리 찾아
            <br />
            여행을 떠나보세요
          </p>
          <div className="flex">
            <button
              className="hidden sm:block border-white border text-white font-medium mx-3  hover:bg-amber-500  text-xl w-48 py-2 my-auto"
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
        </div>
      </div>
    </>
  );
};

export default Landing;
