import React, { useEffect, useRef, useState } from "react";
import { hashTagOptions } from "../components/post/PostHashTag";
import { regionOptions } from "../components/post/PostCategories";
import { PostHeader } from "../components/post";
import { replaceAllData } from "../redux/modules/courseSlice";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseCategories, EditCourseMap } from "../components/edit";
import { PostTravelStatus } from "../components/post/index";
import { authService } from "../utils/firebase";
import Swal from "sweetalert2";
import * as amplitude from "@amplitude/analytics-browser";
import { logEvent } from "../utils/amplitude";
import { usePreventLeave } from "../hooks";

const EditCourse = () => {
  useEffect(() => {
    amplitude.track("수정페이지 접속");
  }, []);
  const paramId = useParams().id;
  const { data, refetch } = useGetCourseQuery();
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const course = filterData?.pop();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  usePreventLeave();

  // 기존 select로 선택했던 내용 불러오기
  const filterRegion = regionOptions.filter((region) =>
    course?.location.includes(region.value)
  );
  const filterTags = hashTagOptions.filter((hashTag) =>
    course?.hashtags.includes(hashTag.label)
  );

  //제목
  const [courseTitle, setCourseTitle] = useState<string | undefined>("");
  const titleRef = useRef<HTMLInputElement>(null);

  //지역 선택
  const [regions, setRegions] = useState<optionType[] | null>([]);
  const regionsRef = useRef<HTMLSelectElement>(null);

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(false);

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  // 커버
  const [uploadCover, setUploadCover] = useState<any>("");
  const [galleryCover, setGalleryCover] = useState<any>("");

  //코스
  const dispatch = useDispatch();

  // 수정한 내용
  const editedList = useSelector((state: any) => state.courseSlice.courseList);

  // 수정 전 내용 불러오기
  useEffect(() => {
    refetch();
    setCourseTitle(course?.title);
    if (course?.travelStatus === true) {
      setTravelStatus(true);
    } else {
      setTravelStatus(false);
    }
    setRegions(filterRegion);
    setSelectedTags(filterTags);
    setGalleryCover(course?.cover);
    dispatch(replaceAllData(JSON.parse(course?.courseList)));
  }, [data]);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();

  const updateCourseHandler = () => {
    const selectedRegions = regions?.map((region: any) => region.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);

    if (selectedRegions?.length === 0) {
      Swal.fire({
        icon: "error",
        title: "하나 이상의 지역을 선택해주세요!",
        didClose: () => {
          regionsRef.current?.focus();
        },
      });
    } else if (!courseTitle?.trim()) {
      Swal.fire({
        icon: "error",
        title: "제목을 입력해주세요!",
        didClose: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          titleRef.current?.focus();
        },
      });
      titleRef.current?.focus();
    } else if (!uploadCover && !galleryCover) {
      Swal.fire({
        icon: "error",
        title: "커버 이미지를 추가해주세요!",
        didClose: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (editedList.length < 2) {
      Swal.fire({
        icon: "error",
        title: "2개 이상의 여행지를 추가해주세요!",
        didClose: () => {
          window.scrollTo({ top: 600, behavior: "smooth" });
        },
      });
    } else {
      Swal.fire({
        title: "게시글을 수정하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#B3261E",
        cancelButtonColor: "#50AA72",
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          updateCourse({
            courseId: paramId,
            location: selectedRegions,
            hashtags: selectedLabels,
            title: courseTitle,
            cover: uploadCover || galleryCover,
            courseList: JSON.stringify(editedList),
            travelStatus,
            nickname: authService.currentUser?.displayName,
            profileImage: authService.currentUser?.photoURL,
          });
          navigate(`/course/${course?.id}`);
          dispatch(replaceAllData([]));
          if (!travelStatus) {
            Swal.fire({
              icon: "success",
              title: "수정이 완료되었습니다! 여행 후 리뷰도 꼭 부탁드려요!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: `${authService.currentUser?.displayName}님의 여정을 공유해주셔서 감사합니다!`,
            });
            logEvent("수정내용 등록", { from: "수정페이지" });
          }
        }
      });
    }
  };

  const onClickCancel = () => {
    Swal.fire({
      title: "게시글 수정을 취소하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 다음 번에 쓸게요.",
      cancelButtonText: "아니요, 마저 쓸게요.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/course/${paramId}`);
        dispatch(replaceAllData([]));
      }
    });
  };

  return (
    <div className="mb-[7%]">
      <PostHeader
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={courseTitle}
        titleRef={titleRef}
        setCourseTitle={setCourseTitle}
      />
      <div className="w-[85%] md:w-[70%] h-auto mx-auto md:mt-[100px] mt-0 ">
        <EditCourseCategories
          regionsRef={regionsRef}
          setTravelStatus={setTravelStatus}
          travelStatus={travelStatus}
          filterRegion={filterRegion}
          regions={regions}
          setRegions={setRegions}
          filterTags={filterTags}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <EditCourseMap
          initLists={course}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <div className="flex flex-col sm:flex-row w-full justify-center gap-2 my-10 sm:gap-[5%]">
          <button
            onClick={() => updateCourseHandler()}
            className="w-full sm:w-[472px] bg-black border-black border-2 text-white text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white "
          >
            게시물 수정하기
          </button>
          <button
            onClick={onClickCancel}
            className="w-full sm:w-[472px] bg-white border-gray-04 border text-black text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white "
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
