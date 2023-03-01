import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeHashTagNum } from "../../redux/modules/searchSlice";

const HashtagList = () => {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-200 w-full h-[650px]">
      <div className="mx-auto 3xl:w-[60%] 2xl:w-[70%] w-[90%]  ">
        <p className="mt-[5%] mb-[2%] ml-4 w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold ">
          HASHTAG IN KOREA
        </p>
        <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
          NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
        </p>
        <div className="flex flex-wrap justify-between mt-[5%] font-hashtags">
          <Link
            onClick={() => dispatch(changeHashTagNum(0))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #화목하게 가족과
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(1))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #우정충전 친구와
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(2))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #사랑하는 연인과
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(3))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #소중한 아이들과
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(4))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #반려동물과 같이
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(5))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #조용히 나 혼자
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(6))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #다 함께 단체로
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(7))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #일상 속의 휴식
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(8))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #로맨틱한 데이트
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(9))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #FLEX! 쇼핑
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(10))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #나만 알고픈 맛집
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(11))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #감성 충천 카페
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(12))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #교양충전 문화생활
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(13))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #떠나봐요 캠핑
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(14))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #배타고 섬으로
          </Link>
          <Link
            onClick={() => dispatch(changeHashTagNum(15))}
            to={"/search"}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #깊은 역사 속으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HashtagList;
