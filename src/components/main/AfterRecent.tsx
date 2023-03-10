import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
import { CreatedDate, ListMap } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGetScreenSize } from "../../hooks";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
import { useRef } from "react";

const AfterRecent = () => {
  const { data, isLoading, isError } = useGetCourseQuery();

  const scrollRef = useRef();

  const scroll = (scrollOffset: any) => {
    // @ts-ignore
    scrollRef.current.scrollLeft += scrollOffset;
  };

  useGetScreenSize();

  if (isError) {
    return <>Error : 데이터를 불러오지 못했습니다.</>;
  }

  return (
    <div className=" mt-[10%]  w-[85%] md:resp h-auto   ">
      <p className=" ml-1 my-[2%] md:bg-gray-01 w-fit lg:text-[47px] sm:text-[35px] text-2xl font-bold font-eng   ">
        NOW REVIEWS
      </p>
      <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
        NILILI 유저들의 최신 여행 후기을 함께 해보세요.
      </p>
      <div className="sm:flex  justify-between mb-[1%] hidden ">
        <button
          className="font-3xl"
          onClick={() => {
            scroll(-window.innerWidth * 0.5);
          }}
        >
          <CgChevronLeft className="text-6xl  " />
        </button>
        <button
          onClick={() => {
            scroll(window.innerWidth * 0.5);
          }}
        >
          <CgChevronRight className="text-6xl  " />
        </button>
      </div>
      <ul
        className="overflow-x-auto whitespace-nowrap no-scrollbar"
        // @ts-ignore
        ref={scrollRef}
      >
        {isLoading ? (
          <div className="flex ">
            {new Array(window.innerWidth < 1024 ? 3 : 4)
              .fill(null)
              .map((_, idx) => (
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  key={idx}
                >
                  <div className=" mb-3 2xl:w-[23%] xl:w-[28%] lg:w-[34%] w-[45%] mr-[2%] ">
                    <Skeleton className="sm:h-[230px] h-[140px]" />
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
          .map((item: CourseType) => (
            <Link
              to={`/course/${item.id}`}
              key={item.id}
              onClick={() =>
                logEvent("post click : BeforeRecent", {
                  from: "메인페이지",
                })
              }
            >
              <li className="2xl:w-[23%] xl:w-[28%] lg:w-[34%] w-[41%] mr-[2%]  inline-block  sm:pt-[2%] pt-[3%] border-t-2 border-black ">
                <Stdiv>
                  <StMap>
                    <ListMap
                      mapstyle={
                        window.innerWidth < 415
                          ? { width: "140px", height: "140px" }
                          : {
                              width: "280px",
                              height: "240px",
                            }
                      }
                      course={item}
                    />
                  </StMap>
                  <StImg
                    src={item.cover}
                    alt="대표 사진"
                    className=" mt-6 sm:w-[280px] sm:h-[240px] h-[140px] w-[140px] object-cover"
                  />
                </Stdiv>
                <p className="ml-1  mt-[8%] mb-[2%] sm:h-[31px]  h-7 max-w-[280px]  w-[98%] sm:text-[28px] text-lg overflow-hidden font-black ">
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

export default AfterRecent;

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
