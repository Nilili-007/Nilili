import React, { useEffect, useRef, useState } from "react";
import { hashTagOptions } from "../components/post/PostHashTag";
import { regionOptions } from "../components/post/PostCategories";
import { replaceAllData } from "../redux/modules/courseSlice";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditCourseCategories,
  EditCourseMap,
  EditCourseMobile,
} from "../components/edit";
import { authService } from "../utils/firebase";
import Swal from "sweetalert2";
import * as amplitude from "@amplitude/analytics-browser";
import { logEvent } from "../utils/amplitude";
import { usePreventLeave, useOption, useCourse, useInput } from "../hooks";
import { PostInfo, PostManageBtns } from "../components/common";

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

  usePreventLeave();

  // 기존 select로 선택했던 내용 불러오기
  const filterRegion = regionOptions.filter((region) =>
    course?.location.includes(region.value)
  );
  const filterTags = hashTagOptions.filter((hashTag) =>
    course?.hashtags.includes(hashTag.label)
  );

  //제목
  const { inputRef, trimValue, changeValueHandler } = useInput("");

  //지역, 카테고리 선택
  const regionsRef = useRef<HTMLSelectElement>(null);
  const {
    selectedTags,
    setSelectedTags,
    regions,
    setRegions,
    selectedLabels,
    selectedRegions,
  } = useOption();

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(false);

  // 커버
  const [uploadCover, setUploadCover] = useState<any>("");
  const [galleryCover, setGalleryCover] = useState<any>("");

  //코스
  const dispatch = useDispatch();

  // 수정한 내용
  const { lists } = useCourse();

  // 수정 전 내용 불러오기
  useEffect(() => {
    refetch();
    inputRef.current.value = course?.title;
    if (course?.travelStatus === true) {
      setTravelStatus(true);
    } else {
      setTravelStatus(false);
    }
    setRegions(filterRegion);
    setSelectedTags(filterTags);
    if (course?.cover?.includes("data:image/")) {
      setUploadCover(course?.cover);
    } else {
      setGalleryCover(course?.cover);
    }
    dispatch(replaceAllData(JSON.parse(course?.courseList)));
  }, [data]);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();

  const updateCourseHandler = () => {
    if (selectedRegions?.length === 0) {
      Swal.fire({
        icon: "error",
        title: `<p style="font-size: 20px;">하나 이상의 지역을 선택해주세요!</p>`,
        didClose: () => {
          regionsRef.current?.focus();
        },
      });
    } else if (!trimValue) {
      Swal.fire({
        icon: "error",
        title: `<p style="font-size: 20px;">제목을 입력해주세요!</p>`,

        didClose: () => {
          inputRef.current?.focus();
        },
      });
    } else if (!uploadCover && !galleryCover) {
      Swal.fire({
        icon: "error",
        title: `<p style="font-size: 20px;">커버 이미지를 추가해주세요!</p>`,

        didClose: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } else if (lists.length < 2) {
      Swal.fire({
        icon: "error",
        title: `<p style="font-size: 20px;">2개 이상의 여행지를 추가해주세요!</p>`,

        didClose: () => {
          window.scrollTo({ top: 600, behavior: "smooth" });
        },
      });
    } else {
      Swal.fire({
        title: `<p style="font-size: 20px;">게시글을 수정하시겠습니까?</p>`,
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
            title: trimValue,
            cover: uploadCover || galleryCover,
            courseList: JSON.stringify(lists),
            travelStatus,
            nickname: authService.currentUser?.displayName,
            profileImage: authService.currentUser?.photoURL,
          });
          navigate(`/course/${course?.id}`);
          dispatch(replaceAllData([]));
          if (!travelStatus) {
            Swal.fire({
              icon: "success",
              title: "수정 완료",
              html: "수정이 완료되었습니다!<br>여행 후기도 꼭 부탁드려요!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "수정 완료",
              html: `${authService.currentUser?.displayName}님의 여정을<br>공유해주셔서 감사합니다!`,
              showConfirmButton: false,
              timer: 1500,
            });
            logEvent("수정내용 등록", { from: "수정페이지" });
          }
        }
      });
    }
  };

  return (
    <div className="mb-[7%]">
      <PostInfo
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={trimValue}
        titleRef={inputRef}
        changeValueHandler={changeValueHandler}
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
        />
        <EditCourseMap />
        <EditCourseMobile />
        <PostManageBtns postHandler={updateCourseHandler} />
      </div>
    </div>
  );
};

export default EditCourse;
