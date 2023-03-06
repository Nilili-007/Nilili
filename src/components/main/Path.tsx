import { useNavigate } from "react-router-dom";
import { logEvent } from "../../utils/amplitude";
import ProgressiveImg from "./ProgressiveImg";
import { authService } from "../../utils/firebase";
import Swal from "sweetalert2";
import { AiOutlineSwapRight } from "react-icons/ai";

const Path = () => {
  const navigate = useNavigate();

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
        logEvent("Path button click : (비회원)검색페이지 이동", {
          from: "메인페이지",
        });
      }
    });
  };

  return (
    <div className=" my-10  3xl:w-[60%] 2xl:w-[70%] w-[90%] min-h-[400px] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold font-eng  ">
        DRAW MY PATH
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[rgb(153,153,153)]">
        여행을 떠나시나요? NILILI를 이용해 일정을 짜보세요.
      </p>

      <div
        onClick={
          authService.currentUser
            ? () => {
                navigate("/post");
                logEvent("Path button click : (회원)글쓰기페이지 이동", {
                  from: "메인페이지",
                });
              }
            : handleNavigate
        }
        className="hover:cursor-pointer pt-6  border-t-2 border-black relative "
      >
        <ProgressiveImg
          src="/assets/path.png"
          placeholderSrc="/assets/smallpath.png"
          alt="글쓰기 페이지로"
          className="w-full hover:border-black border hover:shadow-lg border-gray-03 hover:border-2 "
        />
        <div className="lg:block hidden  font-eng absolute right-[1%] bottom-[30%]">
          <p className="display3  text-amber-500">Go to </p>

          <p className="display2 lg:flex items-center">
            Create Course <AiOutlineSwapRight />
          </p>
        </div>

        <div className="lg:hidden block  font-eng absolute right-[5%] bottom-[30%]">
          <p className="md:display4 title2 flex items-end">
            Create <br />
            Course <AiOutlineSwapRight className="mb-[1%]" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Path;
