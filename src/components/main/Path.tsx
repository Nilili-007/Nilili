import { useNavigate } from "react-router-dom";

const Path = () => {
  const navigate = useNavigate();
  return (
    <div className=" my-10 bg-pink-300 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" w-fit text-[55px] font-bold">FIND MY PATH</p>
      <p className="pb-5 w-fit text-xl text-[#999999]">
        여행을 떠나시나요? NILILI 사용자들의 일정을 참고해보세요.
      </p>

      <div className=" pt-6  border-t-2 border-black relative ">
        <img alt="검색 페이지로" src="/assets/path.png" className="w-full" />
        <button
          onClick={() => {
            navigate("/search");
          }}
          className=" absolute right-0 bottom-0 bg-black  text-white  px-10 py-5 text-2xl"
        >
          FIND MORE →
        </button>
      </div>
    </div>
  );
};

export default Path;
