import { Link } from "react-router-dom";

const HashtagList = () => {
  const hashTagOptions = [
    { value: "#가족", label: "#화목하게 가족과" },
    { value: "#친구", label: "#우정충전 친구와" },
    { value: "#연인", label: "#사랑하는 연인과" },
    { value: "#아이들과", label: "#소중한 아이들과" },
    { value: "#반려동물", label: "#반려동물과 같이" },
    { value: "#혼자", label: "#조용히 나 혼자" },
    { value: "#단체", label: "#다 함께 단체로" },
    { value: "#힐링", label: "#일상 속의 휴식" },
    { value: "#데이트", label: "#로맨틱한 데이트" },
    { value: "#쇼핑", label: "#FLEX! 쇼핑" },
    { value: "#맛집", label: "#나만 알고픈 맛집" },
    { value: "#카페", label: "#감성 충천 카페" },
    { value: "#문화생활", label: "#교양충전 문화생활" },
    { value: "#캠핑", label: "#떠나봐요 캠핑" },
    { value: "#섬", label: "#배타고 섬으로" },
    { value: "#역사", label: "#깊은 역사 속으로" },
  ];

  return (
    <div className="bg-gray-200 w-full h-[650px]">
      <div className="mx-auto 3xl:w-[60%] 2xl:w-[70%] w-[90%]  ">
        <p className="mt-[5%] mb-[2%] ml-4 w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold">
          WHAT'S NEW?
        </p>
        <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
          NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
        </p>
        <div className="flex flex-wrap justify-between mt-[5%]">
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #화목하게 가족과
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #우정충전 친구와
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #사랑하는 연인과
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #소중한 아이들과
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #반려동물과 같이
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #조용히 나 혼자
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #다 함께 단체로
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #일상 속의 휴식
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #로맨틱한 데이트
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #FLEX! 쇼핑
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #나만 알고픈 맛집
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #감성 충천 카페
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #교양충전 문화생활
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #떠나봐요 캠핑
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[30px] text-[30px]  border-black mb-12 "
          >
            #배타고 섬으로
          </Link>
          <Link
            to={`/search/`}
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
