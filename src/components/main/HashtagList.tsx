import { Link } from "react-router-dom";

const HashtagList = () => {
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
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            가족
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            친구
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            연인
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            혼자
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            아이
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            단체
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            반려동물
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            힐링
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            데이트
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            쇼핑
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            맛집
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            카페
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            예술
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            캠핑
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            섬으로
          </Link>
          <Link
            to={`/search/`}
            className=" border-b-4 pr-[10%] text-[45px]  border-black mb-12 "
          >
            역사
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HashtagList;
