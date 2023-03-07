import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
import { ListMap } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGetScreenSize } from "../../hooks";

const BeforeRecent = () => {
  const { data, isLoading, isError } = useGetCourseQuery();

  useGetScreenSize();

  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" mt-[10%]  lg:max-w-6xl w-[90%] min-h-[400px]   ">
      <p className=" ml-1 my-[2%] md:bg-gray-01 w-fit xl:text-[50px] lg:text-[45px] sm:text-[35px] text-3xl font-bold font-eng   ">
        NOW PLANS
      </p>
      <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
        NILILI 유저들의 최신 여행 계획을 함께 해보세요.
      </p>
      <ul className="overflow-x-auto whitespace-nowrap no-scrollbar">
        {isLoading ? (
          <div className="flex ">
            {new Array(4).fill(null).map((_, idx) => (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                key={idx}
              >
                <div className=" mb-3 w-[23%] mr-[2%]">
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
          ?.filter((item: CourseType) => item.travelStatus === false)
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
              <li className=" lg:w-[26%] w-[48%]  mr-[0.1%]  inline-block mx-3 pt-6 border-t-2 border-black ">
                <Stdiv>
                  <StMap>
                    <ListMap
                      mapstyle={
                        window.innerWidth < 768
                          ? { width: "230px", height: "250px" }
                          : {
                              width: "300px",
                              height: "350px",
                            }
                      }
                      course={item}
                    />
                  </StMap>
                  <StImg
                    src={item.cover}
                    alt="대표 사진"
                    className=" mt-6 w-full md:h-[350px] h-[250px]"
                  />
                </Stdiv>
                <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                  {item.title}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {item.nickname}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {JSON.parse(item.createdAt).substr(0, 10)}{" "}
                  {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}
                  {":"}
                  {JSON.parse(item.createdAt).substr(14, 2)}
                </p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default BeforeRecent;

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
