import { useNavigate } from "react-router-dom";
import { logEvent } from "../../utils/amplitude";
import ProgressiveImg from "./ProgressiveImg";
import { authService } from "../../utils/firebase";
import Swal from "sweetalert2";

const Path = () => {
  const navigate = useNavigate();
  const userID = authService.currentUser?.uid;

  const handleNavigate = () => {
    Swal.fire({
      title: "검색 페이지로 이동하시겠습니까?",
      text: "로그인하지 않은 사용자는 검색 페이지로 이동합니다. 글쓰기를 하시려면 로그인 해주세요.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 이동할래요.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/search");
      }
    });
  };

  return (
    <div className=" my-10  3xl:w-[60%] 2xl:w-[70%] w-[90%] min-h-[400px] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        FIND MY PATH
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[rgb(153,153,153)]">
        여행을 떠나시나요? NILILI 사용자들의 일정을 참고해보세요.
      </p>

      <div className=" pt-6  border-t-2 border-black relative ">
        <ProgressiveImg
          src="/assets/path.png"
          placeholderSrc="/assets/smallpath.png"
          alt="글쓰기 페이지로"
          className="w-full"
        />
        {!authService.currentUser ? (
          <button
            onClick={() => {
              navigate("/search");
              logEvent("Path button click : (비회원)검색페이지 이동", {
                from: "메인페이지",
              });
            }}
            className=" absolute right-0 bottom-0 bg-black  text-white  sm:px-10 py-5 sm:text-2xl text-base px-5 "
          >
            FIND MORE →
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/post");
              logEvent("Path button click : (회원)글쓰기페이지 이동", {
                from: "메인페이지",
              });
            }}
            className=" absolute right-0 bottom-0 bg-black  text-white  sm:px-10 py-5 sm:text-2xl text-base px-5 "
          >
            CREATE COURSE →
          </button>
        )}
      </div>
    </div>
  );
};

export default Path;
