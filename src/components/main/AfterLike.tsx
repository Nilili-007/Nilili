import { useGetCourseLikeQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CreatedDate, ListMap } from "../shared";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGetScreenSize } from "../../hooks";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";

const AfterLike = () => {
  const { data, isLoading, isError } = useGetCourseLikeQuery();
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } =
    useSmoothHorizontalScroll();
  useGetScreenSize();

  if (isError) {
    return <>Error : 데이터를 불러오지 못했습니다.</>;
  }

  return (
    <div className=" mt-[10%]   lg:max-w-6xl w-[90%] min-h-[400px]  ">
      <p className=" ml-1 my-[2%] w-fit xl:text-[50px] lg:text-[45px] sm:text-[35px] text-3xl font-bold font-eng  ">
        BEST REVIEWS
      </p>
      <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
        NILILI 유저들이 남긴 최고의 여행 리뷰를 소개합니다.
      </p>
      <div className="sm:flex  justify-between mb-[1%] hidden ">
        <button
          className="font-3xl"
          onClick={() => scrollTo(-window.innerWidth * 0.5)}
          disabled={isAtStart}
        >
          <CgChevronLeft className="text-6xl  " />
        </button>
        <button
          onClick={() => scrollTo(window.innerWidth * 0.5)}
          disabled={isAtEnd}
        >
          <CgChevronRight className="text-6xl  " />
        </button>
      </div>
      <ul
        className=" overflow-x-auto whitespace-nowrap no-scrollbar"
        // @ts-ignore
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {isLoading ? (
          <div className="flex ">
            {new Array(3).fill(null).map((_, idx) => (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                key={idx}
              >
                <div className=" mb-3 3xl:w-[31%] w-[45%]  mr-[4%]">
                  <Skeleton className="h-[300px]" />
                  <div className="mt-3">
                    <Skeleton className="w-[80%] h-[30px]" />
                    <Skeleton className="w-[30%]  h-[25px]" />
                    <Skeleton className="w-[60%] h-[20px]" />
                  </div>
                </div>
              </SkeletonTheme>
            ))}
          </div>
        ) : null}

        {data
          ?.filter((item: CourseType) => item.travelStatus === true)
          .slice(0, 16)
          .map((item) => (
            <Link
              to={`/course/${item.id}`}
              key={item.id}
              onClick={() =>
                logEvent("post click : AfterLike", { from: "메인페이지" })
              }
            >
              <li className="lg:w-[31%] w-[51%] mr-[2%] inline-block  pt-[2%] border-t-2 border-black ">
                <Stdiv>
                  <StMap>
                    <ListMap
                      mapstyle={
                        window.innerWidth < 415
                          ? { width: "200px", height: "200px" }
                          : {
                              width: "380px",
                              height: "380px",
                            }
                      }
                      course={item}
                    />
                  </StMap>
                  <StImg
                    src={item.cover}
                    alt="대표 사진"
                    className="mt-6 w-full sm:h-[380px] h-[200px]"
                  />
                </Stdiv>
                <p className="ml-1  mt-[8%] mb-[2%] sm:h-9  h-7  w-[98%] sm:text-[28px] text-lg overflow-hidden font-black ">
                  {item.title}
                </p>
                <p className="ml-1 mt-[3%]  font-medium  text-gray-400 sm:text-2xl text-base  ">
                  {item.nickname}
                </p>
                <p className="ml-1 mt-[3%] font-medium  text-gray-400 sm:text-xl mb-3  text-sm  ">
                  <CreatedDate createdAt={item.createdAt} />
                </p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default AfterLike;

const StImg = styled.img`
  position: absolute;
  bottom: 0px;
`;

const StMap = styled.div`
  overflow: hidden;
  opacity: 0%;
`;

const Stdiv = styled.div`
  position: relative;

  &:hover {
    ${StImg} {
      display: none;
    }
    ${StMap} {
      opacity: 100%;
    }
  }
`;
