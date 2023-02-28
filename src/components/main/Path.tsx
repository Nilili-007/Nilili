import { useNavigate } from "react-router-dom";

import ProgressiveImg from "./ProgressiveImg";
import { authService } from "../../utils/firebase";

const Path = () => {
  const navigate = useNavigate();
  const userID = authService.currentUser?.uid;
  console.log(userID);

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
        <button
          onClick={() => {
            userID ? navigate("/post") : navigate("/search");
          }}
          className=" absolute right-0 bottom-0 bg-black  text-white  sm:px-10 py-5 sm:text-2xl text-base px-5 "
        >
          FIND MORE →
        </button>
      </div>
    </div>
  );
};

export default Path;
