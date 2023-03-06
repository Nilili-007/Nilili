import { useGetCourseLikeQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ListMap } from "../shared";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AfterLike = () => {
  const { data, isLoading, isError, error } = useGetCourseLikeQuery();
  if (isError) {
    return <> {error}</>;
  }

  return (
    <div className=" my-[2%]  3xl:w-[55%] md:w-[60%] w-[90%] min-h-[400px]  ">
      <p className=" ml-1 my-[2%] w-fit xl:text-[50px] lg:text-[45px] sm:text-[35px] text-xl font-bold font-eng  ">
        BEST REVIEWS
      </p>
      <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
        NILILI 유저들이 남긴 최고의 여행 리뷰를 소개합니다.
      </p>

      {isLoading ? (
        <div className="flex justify-between">
          {new Array(3).fill(null).map((_, idx) => (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
              <div className=" mb-3 ">
                <Skeleton width={300} height={300} />
                <div className="mt-3">
                  <Skeleton width={200} height={30} />
                  <Skeleton width={50} height={25} />
                  <Skeleton width={150} height={15} />
                </div>
              </div>
            </SkeletonTheme>
          ))}
        </div>
      ) : null}
      <ul className=" overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item: CourseType) => item.travelStatus === true)
          .slice(0, 3)
          .map((item) => (
            <Link
              to={`/course/${item.id}`}
              key={item.id}
              onClick={() =>
                logEvent("post click : AfterLike", { from: "메인페이지" })
              }
            >
              <li className="md:w-[31%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black ">
                <Stdiv>
                  <StMap>
                    <ListMap course={item} />
                  </StMap>
                  <StImg
                    src={item.cover}
                    alt="대표 사진"
                    className=" pt-6 border-t-2 border-black h-[324px] w-[300px]"
                  />
                </Stdiv>
                <p className="pr-4 ml-1 mt-5 mb-5  sm:text-2xl text-xl overflow-hidden font-black ">
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
