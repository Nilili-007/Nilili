import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateTravelStatusMutation } from "../../redux/modules/apiSlice";
import { ListMap } from "../shared";
import SearchPagenation from "../search/SearchPagenation";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = userData
    ? userData.slice(firstPostIndex, lastPostIndex)
    : null;

  const totalContents: any = userData?.length;

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }

  const filterData = () => {
    const mypaths = data?.filter(
      (item) => item.userID === userID && item.travelStatus === done
    );
    const mylikes = data?.filter(
      (item) => item.likesID?.includes(userID) && item.travelStatus === done
    );
    category === "MY" ? setUserData(mypaths) : setUserData(mylikes);
  };

  const changeTravelStatusTrue = (id: string | undefined) => {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        Swal.fire("변경 완료!", "여행 후로 변경되었습니다.", "success");
      }
    });
  };

  const changeTravelStatusFalse = (id: string | undefined) => {
    Swal.fire({
      title: "여행 전으로 변경하시겠습니까?",
      text: "You won't be able to revert this!",
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

  useEffect(() => {
    filterData();
  }, [data, category, done]);

  if (isLoading) {
    return (
      <div className="h-[608px] w-full flex justify-center items-center">
        <SyncLoader color="#A0A4A8" margin={12} size={18} />
      </div>
    );
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <ul className="flex flex-wrap justify-evenly">
        {currentPosts?.map((item: CourseType) => (
          <Link
            to={`/course/${item.id}`}
            key={item.id}
            className="xl:w-[31%] lg:w-[32%] sm:w-[47%] w-[90%]  "
          >
            <Stdiv>
              <StMap>
                <ListMap course={item} />
              </StMap>
              <StButtonDiv>
                {category !== "MY" ? null : item.travelStatus ? (
                  <button onClick={() => changeTravelStatusFalse(item.id)}>
                    여행 전으로 토글
                  </button>
                ) : (
                  <button onClick={() => changeTravelStatusTrue(item.id)}>
                    여행 후로 토글
                  </button>
                )}
              </StButtonDiv>

              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" border-black h-[324px] w-[300px]"
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
              {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}
              {":"}
              {JSON.parse(item.createdAt).substr(14, 2)}
            </p>
          </Link>
        ))}
      </ul>
      {/* pagenation */}
      <SearchPagenation
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
      />
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

const StMap = styled.div`
  opacity: 0%;
  filter: brightness(20%);
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
    ${StButtonDiv} {
      opacity: 100%;
    }
  }
`;
