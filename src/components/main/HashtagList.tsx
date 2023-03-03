import { Link } from "react-router-dom";
import { logEvent } from "../../utils/amplitude";
import { hashTagOptions } from "../post/PostHashTag";

const HashtagList = () => {
  const hashTagAmplitudeEvent = () => {
    logEvent("button click : 해시태그 검색", {
      from: "메인페이지 Hashtag",
    });
  };
  return (
    <div className="bg-gray-200 w-full h-[650px]">
      <div className="mx-auto 3xl:w-[60%] 2xl:w-[70%] w-[90%]  ">
        <p className="mt-[5%] mb-[2%] ml-4 w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold ">
          HASHTAG IN KOREA
        </p>
        <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
          NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
        </p>
        <div className="flex flex-wrap justify-between mt-[5%] font-hashtags ">
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[0]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #화목하게 가족과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[1]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #우정충전 친구와
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[2]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #사랑하는 연인과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[3]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #소중한 아이들과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[4]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #반려동물과 같이
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[5]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12  hover:bg-black hover:text-white"
          >
            #조용히 나 혼자
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[6]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #다 함께 단체로
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[7]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white "
          >
            #일상 속의 휴식
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[8]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #로맨틱한 데이트
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[9]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #FLEX! 쇼핑
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[10]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #나만 알고픈 맛집
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[11]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #감성 충천 카페
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[12]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #교양충전 문화생활
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[13]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #떠나봐요 캠핑
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[14]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #배타고 섬으로
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[15]])}`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 hover:bg-black hover:text-white"
          >
            #깊은 역사 속으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HashtagList;
