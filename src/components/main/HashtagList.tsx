import { Link } from "react-router-dom";
import { logEvent } from "../../utils/amplitude";
import { hashTagOptions } from "../post/PostHashTag";
import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

const HashtagList = () => {
  const hashTagAmplitudeEvent = () => {
    logEvent("button click : 해시태그 검색", {
      from: "메인페이지 Hashtag",
    });
  };

  const [openHash, setOpenHash] = useState(false);

  return (
    <div
      className={`mt-[10%] pb-[2%] bg-gray-200 w-full  overflow-hidden 
       ${openHash === false ? "m-sm:max-h-[250px]" : null}
      } `}
    >
      <div className="mx-auto   w-[85%] md:resp  ">
        <p className="mt-[5%] mb-[2%]  ml-1 my-[2%] w-fit lg:text-[47px] sm:text-[35px] text-2xl font-bold font-eng  ">
          HASHTAG IN KOREA
        </p>
        <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
          원하는 해시태그 별 일정을 검색하러 가보세요.
        </p>
        <div className="block sm:hidden">
          {openHash === false ? (
            <button onClick={() => setOpenHash(true)} className="flex badge">
              <CgChevronDown className="text-3xl" /> 더보기
            </button>
          ) : (
            <button onClick={() => setOpenHash(false)} className="flex badge">
              <CgChevronUp className="text-3xl" /> 닫기
            </button>
          )}
        </div>
        <div className=" flex-wrap  mt-[3%] gap-y-4 sm:gap-y-9 gap-x-4 font-hashtags grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[0]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px]  font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #화목하게 가족과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[1]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #우정충전 친구와
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[2]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #사랑하는 연인과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[3]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #소중한 아이들과
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[4]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #반려동물과 같이
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[5]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #조용히 나 혼자
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[6]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #다 함께 단체로
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[7]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #일상 속의 휴식
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[8]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #로맨틱한 데이트
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[9]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #FLEX! 쇼핑
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[10]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #나만 알고픈 맛집
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[11]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #감성 충천 카페
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[12]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #교양충전 문화생활
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[13]])}`}
            className=" border-b-[3px]      pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #떠나봐요 캠핑
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[14]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #배타고 섬으로
          </Link>
          <Link
            onClick={() => {
              hashTagAmplitudeEvent();
            }}
            to={`/search?ht=${JSON.stringify([hashTagOptions[15]])}`}
            className=" border-b-[3px]     pl-[0.3%] pt-2 mr-[3%] sm:text-[25px]  text-[15px] font-normal border-black mb-[5%] hover:bg-black hover:text-white "
          >
            #깊은 역사 속으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HashtagList;
