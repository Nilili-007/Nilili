import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[900px] flex flex-col justify-center items-center p-5 ">
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdZov1s%2FbtriZr7G14l%2FNDhpk5OzgfJcB2TwD8kxJ0%2Fimg.png"
          alt="error"
        />
        <div className="title1 m-3">해당 페이지를 찾을 수 없습니다</div>
        <button
          className="text-white bg-black font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none m-3"
          onClick={() => navigate("/")}
        >
          메인 페이지로 돌아가기
        </button>
      </div>
    </>
  );
};

export default NotFound;
