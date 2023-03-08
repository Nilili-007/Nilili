import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateTravelStatusMutation } from "../../redux/modules/apiSlice";
import { CreatedDate, ListMap, Pagenation } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { usePagenation, useGetScreenSize } from "../../hooks";

type UserListType = {
  done: boolean;
  category: string;
};

const UserList = ({ done, category }: UserListType) => {
  const { data, isLoading, isError } = useGetCourseQuery();
  const userID = authService.currentUser?.uid;
  const [userData, setUserData] = useState<CourseType[]>();
  const navigate = useNavigate();
  const [updateTravelStatus] = useUpdateTravelStatusMutation();

  const {
    firstPostIndex,
    lastPostIndex,
    pages,
    currentPage,
    setCurrentPage,
    pageArr,
    setPageArr,
    lastPage,
    firstPage,
    showPages,
    currentPages,
    positionY,
  } = usePagenation(userData, 6, 5, 300);

  useGetScreenSize();

  const currentPosts = userData
    ? userData.slice(firstPostIndex, lastPostIndex)
    : null;

  const filterData = () => {
    const mypaths = data?.filter(
      (item) => item.userID === userID && item.travelStatus === done
    );
    const mylikes = data?.filter(
      (item) => item.likesID?.includes(userID) && item.travelStatus === done
    );
    category === "MY" ? setUserData(mypaths) : setUserData(mylikes);
  };

  const changeTravelStatusTrue = (event: any, id: string | undefined) => {
    event.stopPropagation();
    Swal.fire({
      title: "리뷰를 남기시겠습니까?",
      text: "NILILI에 소중한 리뷰를 남겨주세요 ♥",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "리뷰도 작성할게요!",
      cancelButtonText: "여행 후로만 변경할게요.",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        navigate(`/edit/${id}`);
        logEvent("리뷰 작성하러 이동", { from: "유저페이지" });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        Swal.fire("변경 완료!", "여행 후로 변경되었습니다.", "success");
        logEvent("여행 후로만 변경하기", { from: "유저페이지" });
      }
    });
  };

  const changeTravelStatusFalse = (event: any, id: string | undefined) => {
    event.stopPropagation();
    Swal.fire({
      title: "여행 전으로 변경하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 변경해주세요.",
    }).then((result) => {
      if (result.isConfirmed) {
        updateTravelStatus({
          courseId: id,
          travelStatus: false,
        });
        Swal.fire("변경 완료!", "여행 전으로 변경되었습니다.", "success");
      }
    });
  };

  const handleNavigate = (event: any, id: string) => {
    event.stopPropagation();
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    filterData();
  }, [data, category, done]);

  if (!isLoading) {
    return (
      <div className="flex flex-row flex-wrap mt-[3%]">
        {new Array(9).fill(null).map((_, idx) => (
          <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
            <div className=" mb-[5%] lg:w-[31%] md:w-[48%] sm:w-[80%] w-[48%]  mr-[2%] ">
              <Skeleton className=" sm:h-[300px] h-[160px]" />
              <div className="mt-3">
                <Skeleton className="w-[80%] h-[30px]" />
                <Skeleton className="w-[30%]  h-[25px]" />
                <Skeleton className="w-[60%] h-[20px]" />
              </div>
            </div>
          </SkeletonTheme>
        ))}
      </div>
    );
  }
  if (isError) {
    return <>Error : 데이터를 불러오지 못했습니다.</>;
  }
  return (
    <div className=" my-[4%] min-h-[90vh] ">
      <ul className="flex flex-wrap ">
        {currentPosts?.map((item: CourseType) => (
          <div
            onClick={(event: any) => handleNavigate(event, item.id)}
            key={item.id}
            className="relative lg:w-[31%] md:w-[48%] sm:w-[80%] w-[48%]  mr-[2%] hover:cursor-pointer"
          >
            <Stdiv>
              <StMap category={category}>
                <ListMap
                  mapstyle={
                    window.innerWidth < 415
                      ? { width: "170px", height: "170px" }
                      : {
                          width: "350px",
                          height: "350px",
                        }
                  }
                  course={item}
                />
              </StMap>
              <StButtonDiv className="hidden sm:block">
                {category !== "MY" ? null : item.travelStatus ? (
                  <button
                    onClick={(event: any) =>
                      changeTravelStatusFalse(event, item.id)
                    }
                  >
                    여행 전으로 변경
                  </button>
                ) : (
                  <button
                    onClick={(event: any) => {
                      changeTravelStatusTrue(event, item.id);
                      logEvent("여행 후로 변경", { from: "유저페이지" });
                    }}
                  >
                    여행 후로 변경
                  </button>
                )}
              </StButtonDiv>
              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" sm:h-[350px] sm:w-[350px] h-[170px] w-[170px]"
                category={category}
              />
            </Stdiv>
            {window.innerWidth < 415 ? (
              <div className="ml-1 border-2 border-black w-fit p-[2px] badge relative bottom-6  ">
                {category !== "MY" ? null : item.travelStatus ? (
                  <button
                    onClick={(event: any) =>
                      changeTravelStatusFalse(event, item.id)
                    }
                  >
                    여행 전으로 변경
                  </button>
                ) : (
                  <button
                    onClick={(event: any) => {
                      changeTravelStatusTrue(event, item.id);
                      logEvent("여행 후로 변경", { from: "유저페이지" });
                    }}
                  >
                    여행 후로 변경
                  </button>
                )}
              </div>
            ) : null}

            <p
              className={`pr-4 ml-1 sm:h-9  h-7  w-[98%] sm:text-2xl text-xl overflow-hidden font-black ${
                category === "MY" ? "mt-[-20px]" : "mt-5"
              }`}
            >
              {item.title}
            </p>
            {category === "MY" ? null : (
              <p className="ml-1 mt-[3%]  font-medium  text-gray-400 text-2xl   ">
                {item.nickname}
              </p>
            )}
            <p className="ml-1 mt-[2%] font-medium  text-gray-400 text-xl mb-[10%]">
              {JSON.parse(item.createdAt).substr(0, 10)}{" "}
              {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}:
              {JSON.parse(item.createdAt).substr(14, 2)}
            </p>
          </div>
        ))}
      </ul>
      {/* pagenation */}
      {userData?.length === 0 ? (
        <div className="h-52 flex pt-16 justify-center text-sm sm:text-lg flex-wrap">
          {category === "MY" ? "작성된" : "좋아요를 누른"}{" "}
          {done ? "여행 후" : "여행 전"} 게시물이 없습니다.
        </div>
      ) : (
        <Pagenation
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
          pageArr={pageArr}
          setPageArr={setPageArr}
          lastPage={lastPage}
          firstPage={firstPage}
          showPages={showPages}
          currentPages={currentPages}
          positionY={positionY}
        />
      )}
    </div>
  );
};
export default UserList;

const StButtonDiv = styled.div`
  color: white;
  position: relative;
  z-index: 1;
  opacity: 0%;
  bottom: 185px;
  left: 23%;
  font-size: 25px;
  width: fit-content;
  &:hover {
    font-weight: 700;
    background-color: rgba(245, 158, 11, 0.6);
  }
  & > button {
    padding-right: 10px;
    padding-left: 10px;
  }
`;

const StImg = styled.img<{ category: string }>`
  position: absolute;
  bottom: ${(props) => (props.category === "MY" ? "37.5px" : "0px")};
`;

const StMap = styled.div<{ category: string }>`
  opacity: 0%;
  ${(props) => (props.category === "MY" ? "filter: Brightness(20%)" : null)};
`;

const Stdiv = styled.div`
  position: relative;
  overflow: hidden;
  &:hover {
    ${StImg} {
      display: none;
    }
    ${StMap} {
      opacity: 100%;
    }
    ${StButtonDiv} {
      opacity: 100%;
    }
  }
`;
