import React, { useEffect, useRef, useState } from "react";
import { hashTagOptions } from "../components/post/PostHashTag";
import { regionOptions } from "../components/post/PostCategories";
import { PostHeader } from "../components/post";
import { replaceAllData } from "../redux/modules/temporarySlice";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseCategories, EditCourseMap } from "../components/edit";
import { authService } from "../utils/firebase";
import Swal from "sweetalert2";

const EditCourse = () => {
  const paramId = useParams().id;
  const { data } = useGetCourseQuery();
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const course = filterData?.pop();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
  const [ragions, setRagions] = useState<optionType[] | null>([]);
  const ragionsRef = useRef<HTMLSelectElement>(null);

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
  const editedList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  // 수정 전 내용 불러오기
  useEffect(() => {
    setCourseTitle(course?.title);
    if (course?.travelStatus === true) {
      setTravelStatus(true);
    } else {
      setTravelStatus(false);
    }
    setRagions(filterRegion);
    setSelectedTags(filterTags);
    setGalleryCover(course?.cover);
    dispatch(replaceAllData(JSON.parse(course?.courseList)));
  }, []);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();

  const updateCourseHandler = () => {
    const selectedRegions = ragions?.map((region: any) => region.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);

    if (selectedRegions?.length === 0) {
      Swal.fire({
        icon: "error",
        title: "하나 이상의 지역을 선택해주세요!",
      });
      ragionsRef.current?.focus();
    } else if (!courseTitle?.trim()) {
      Swal.fire({
        icon: "error",
        title: "제목을 입력해주세요!",
      });
      titleRef.current?.focus();
    } else if (!uploadCover && !galleryCover) {
      Swal.fire({
        icon: "error",
        title: "커버 이미지를 추가해주세요!",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (editedList.length < 2) {
      Swal.fire({
        icon: "error",
        title: "2개 이상의 여행지를 추가해주세요!",
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
    <div className="mb-64">
      <PostHeader
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={courseTitle}
        titleRef={titleRef}
        setCourseTitle={setCourseTitle}
      />
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <EditCourseCategories
          ragionsRef={ragionsRef}
          setTravelStatus={setTravelStatus}
          travelStatus={travelStatus}
          filterRagion={filterRegion}
          ragions={ragions}
          setRagions={setRagions}
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
        <div className="flex w-full justify-center gap-[5%] my-10">
          <button
            onClick={() => updateCourseHandler()}
            className="w-[25%] bg-black border-black border-2 text-white text-lg py-3 hover:text-black hover:bg-white "
          >
            게시물 수정하기
          </button>
          <button
            onClick={onClickCancel}
            className="w-[25%] bg-black border-black border-2 text-white text-lg py-3 hover:text-black hover:bg-white "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
