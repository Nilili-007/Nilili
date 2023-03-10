import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddCourseMutation,
  useGetCourseQuery,
} from "../redux/modules/apiSlice";
import { authService } from "../utils/firebase";
import {
  PostHashTag,
  PostCategories,
  PostMap,
  PostTravelStatus,
  PostMobileCourse,
} from "../components/post/index";
import Swal from "sweetalert2";
import * as amplitude from "@amplitude/analytics-browser";
import { logEvent } from "../utils/amplitude";
import { usePreventLeave, useOption } from "../hooks";
import { PostInfo, PostManageBtns } from "../components/common";

const Post = () => {
  useEffect(() => {
    amplitude.track("글쓰기페이지 접속");
  }, []);
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();
  const { data } = useGetCourseQuery();

  usePreventLeave();

  const titleRef = useRef<HTMLInputElement>(null);
  const regionsRef = useRef<HTMLSelectElement>(null);

  // 커버
  const [uploadCover, setUploadCover] = useState<string | undefined>("");
  const [galleryCover, setGalleryCover] = useState("");

  //제목
  const [courseTitle, setCourseTitle] = useState<string | undefined>("");

  // select
  const {
    selectedTags,
    setSelectedTags,
    regions,
    setRegions,
    selectedLabels,
    selectedRegions,
  } = useOption();

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(null);

  //navigate할 때 쓸 state
  const [condition, setCondition] = useState(false);

  const userID = authService.currentUser?.uid;
  const courseList = useSelector((state: any) => state.courseSlice.courseList);

  const addPostHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const newPost = {
      location: selectedRegions,
      hashtags: selectedLabels,
      title: courseTitle,
      travelStatus,
      courseList: JSON.stringify(courseList),
      cover: uploadCover || galleryCover,
      userID,
      nickname: authService.currentUser?.displayName,
      createdAt: JSON.stringify(new Date()),
      likes: 0,
      likesID: [],
      profileImage: authService.currentUser?.photoURL,
    };

    if (
      (uploadCover || galleryCover) &&
      travelStatus !== null &&
      regions.length > 0 &&
      courseTitle?.trim() &&
      courseList.length > 1
    ) {
      Swal.fire({
        title: `<p style="font-size: 20px;">게시글을 등록하시겠습니까?</p>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#B3261E",
        cancelButtonColor: "#50AA72",
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          addCourse(newPost);
          setCondition(true);
          if (!travelStatus) {
            Swal.fire({
              icon: "success",
              title: `<p style="font-size: 20px;">훌륭한 여정이에요! \n 여행 후기도 꼭 부탁드려요!!</p>`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: `<p style="font-size: 20px;">${authService.currentUser?.displayName}님의 여정을 공유해주셔서 감사합니다!</p>`,
            });
          }
        }
      });
      logEvent("게시물 등록", {
        from: "글쓰기 페이지",
        information: {
          지역: selectedRegions,
          해시태그: selectedLabels,
          여행여부: travelStatus,
        },
      });
    } else {
      if (!uploadCover && !galleryCover) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">커버 이미지를 추가해주세요!</p>`,
          didClose: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        });
      }
      if (travelStatus === null) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">여행 여행 계획/후기 카테고리를 선택해주세요!</p>`,
          didClose: () => {
            window.scrollTo({ top: 450, behavior: "smooth" });
          },
        });
      }
      if (regions.length === 0) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">하나 이상의 지역을 선택해주세요!</p>`,
          didClose: () => {
            regionsRef.current?.focus();
          },
        });
      }
      if (!courseTitle?.trim()) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">제목을 입력해주세요!</p>`,
          didClose: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            titleRef.current?.focus();
          },
        });
      }
      if (courseList.length < 2) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">2개 이상의 여행지를 추가해주세요!</p>`,
          didClose: () => {
            window.scrollTo({ top: 600, behavior: "smooth" });
          },
        });
      }
    }
  };

  useEffect(() => {
    if (condition && data) {
      navigate(`/course/${data[0].id}`);
      setCondition(false);
    }
  }, [data]);

  window.addEventListener("popstate", () =>
    window.history.pushState(null, "", window.location.href)
  );

  return (
    <div className="mb-[7%]">
      <PostInfo
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
        titleRef={titleRef}
      />
      <div className="w-[85%] md:w-[70%] h-auto mx-auto md:mt-[100px] mt-0 ">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] sm:text-3xl whitespace-normal font-bold">
              나만의 코스를 만들어보세요.
            </p>
            <p className="text-gray-400 mt-1 text-[13px] sm:body2 whitespace-normal xs:-mt-1 xs:text-xs">
              간단한 클릭으로 여행지를 추가하고 순서를 변경할 수 있어요.
            </p>
          </div>
          <PostTravelStatus
            travelStatus={travelStatus}
            setTravelStatus={setTravelStatus}
          />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 mt-4 lg:m-0">
          <PostCategories
            regionsRef={regionsRef}
            regions={regions}
            setRegions={setRegions}
          />
          <PostHashTag
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <PostMap />
        <PostMobileCourse />
        <PostManageBtns postHandler={addPostHandler} />
      </div>
    </div>
  );
};

export default Post;
