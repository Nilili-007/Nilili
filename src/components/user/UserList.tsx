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

  const changeTravelStatusTrue = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | undefined
  ) => {
    Swal.fire({
      title: "후기를 남기시겠습니까?",
      text: "NILILI에 소중한 후기를 남겨주세요 ♥",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "후기도 작성할게요!",
      cancelButtonText: "여행 후기로만 변경할게요.",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        navigate(`/edit/${id}`);
        logEvent("후기 작성하러 이동", { from: "유저페이지" });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        Swal.fire("변경 완료!", "여행 후기로 변경되었습니다.", "success");
        logEvent("여행 후기로만 변경하기", { from: "유저페이지" });
      }
    });
  };

  const changeTravelStatusFalse = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | undefined
  ) => {
    Swal.fire({
      title: "여행 계획으로 변경하시겠습니까?",
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
        Swal.fire("변경 완료!", "여행 계획으로 변경되었습니다.", "success");
      }
    });
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    filterData();
  }, [data, category, done]);

  if (isLoading) {
    return (
      <div className="flex flex-row flex-wrap mt-[3%]">
        {new Array(9).fill(null).map((_, idx) => (
          <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
            <div className=" mb-[5%] xl:w-[31%] md:w-[48%] sm:w-[80%] w-[48%]  mr-[2%]   ">
              <Skeleton className=" sm:h-[260px] h-[150px]" />
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
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleNavigate(event, item.id)
            }
            key={item.id}
            className="relative xl:w-[31%] md:w-[48%] sm:w-[80%] w-[48%]  mr-[2%] hover:cursor-pointer"
          >
            <Stdiv>
              <StMap category={category}>
                <ListMap
                  mapstyle={
                    window.innerWidth < 415
                      ? { width: "150px", height: "150px" }
                      : {
                          width: "340px",
                          height: "260px",
                        }
                  }
                  course={item}
                />
              </StMap>
              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" sm:h-[260px] sm:w-[340px] h-[150px] w-[150px] object-cover"
                category={category}
              />
            </Stdiv>

            <div className="ml-1  w-fit sm:text-[18px] text-sm font-medium mt-2 hover:shadow-md ">
              {category !== "MY" ? null : item.travelStatus ? (
                <button
                  className="border-2 border-black p-[2px]"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    changeTravelStatusFalse(event, item.id)
                  }
                >
                  여행 계획으로 변경
                </button>
              ) : (
                <button
                  className="border-2 border-black p-[2px]"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    changeTravelStatusTrue(event, item.id);
                    logEvent("여행 후기로 변경", { from: "유저페이지" });
                  }}
                >
                  여행 후기로 변경
                </button>
              )}
            </div>

            <p
              className={`pr-4 ml-1 sm:h-[30px]  h-7  max-w-[340px] w-[98%] sm:text-[28px] text-lg overflow-hidden font-black mt-[3%]`}
            >
              {item.title}
            </p>
            {category === "MY" ? null : (
              <p className="ml-1 mt-[3%]  font-medium  text-gray-400 sm:text-2xl text-base">
                {item.nickname}
              </p>
            )}
            <p className="ml-1 mt-[2%] font-medium  text-gray-400 sm:text-xl text-sm  mb-[10%]">
              <CreatedDate createdAt={item.createdAt} />
            </p>
          </div>
        ))}
      </ul>
      {/* pagenation */}
      {userData?.length === 0 ? (
        <div className="h-52 flex pt-16 justify-center text-sm sm:text-lg flex-wrap">
          {category === "MY" ? "작성된" : "좋아요를 누른"}{" "}
          {done ? "여행 후기" : "여행 계획"} 게시물이 없습니다.
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
          currentPages={currentPages}
          positionY={positionY}
        />
      )}
    </div>
  );
};
export default UserList;

const StImg = styled.img<{ category: string }>`
  position: absolute;
  bottom: 0px;
`;

const StMap = styled.div<{ category: string }>`
  opacity: 0%;
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
  }
`;
