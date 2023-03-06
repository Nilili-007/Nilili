import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateTravelStatusMutation } from "../../redux/modules/apiSlice";
import { ListMap, Pagenation } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import usePagenation from "../../hooks/usePagenation";

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
  } = usePagenation(userData, 6, 5);

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
      <div className="flex flex-row flex-wrap">
        {new Array(9).fill(null).map((_, idx) => (
          <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
            <div className=" mb-[5%] w-[31%] mr-[2%]">
              <Skeleton className=" h-[300px]" />
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
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 ">
      <ul className="flex flex-wrap ">
        {currentPosts?.map((item: CourseType) => (
          <div
            onClick={(event: any) => handleNavigate(event, item.id)}
            key={item.id}
            className=" w-[33%] "
          >
            <Stdiv>
              <StMap category={category}>
                <ListMap course={item} />
              </StMap>
              <StButtonDiv>
                {category !== "MY" ? null : item.travelStatus ? (
                  <button
                    onClick={(event: any) =>
                      changeTravelStatusFalse(event, item.id)
                    }
                  >
                    여행 전으로 토글
                  </button>
                ) : (
                  <button
                    onClick={(event: any) => {
                      changeTravelStatusTrue(event, item.id);
                      logEvent("여행 후로 변경", { from: "유저페이지" });
                    }}
                  >
                    여행 후로 토글
                  </button>
                )}
              </StButtonDiv>
              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" border-black h-[300px] w-[300px]"
              />
            </Stdiv>

            <p className="pr-4 ml-1 mt-5 sm:h-16 h-14 sm:text-2xl text-xl overflow-hidden font-black ">
              {item.title}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {item.nickname}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {JSON.parse(item.createdAt).substr(0, 10)}{" "}
              {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}:
              {JSON.parse(item.createdAt).substr(14, 2)}
            </p>
          </div>
        ))}
      </ul>
      {/* pagenation */}
      {userData?.length === 0 ? null : (
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
  bottom: 150px;
  left: 70px;
  font-size: 25px;

  &:hover {
    font-weight: 700;
  }
`;

const StImg = styled.img`
  position: absolute;
  bottom: 24px;
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
