import React, { useEffect, useRef, useState } from "react";
import { hashTagOptions } from "../components/post/PostHashTag";
import { regionOptions } from "../components/post/PostTitle";
import { PostHeader } from "../components/post";
import { replaceAllData } from "../redux/modules/temporarySlice";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseMap, EditCourseTitle } from "../components/edit";

const EditCourse = () => {
  const paramId = useParams().id;
  const { data, refetch } = useGetCourseQuery();
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const course = filterData?.pop();
  const navigate = useNavigate();

  const editedList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

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
  }, [data]);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();

  const updateCourseHandler = () => {
    const selectedRegions = regions?.map((region: any) => region.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);

    if (selectedRegions?.length === 0) {
      alert("하나 이상의 지역을 선택해주세요.");
      regionsRef.current?.focus();
    } else if (!courseTitle?.trim()) {
      alert("제목을 입력해주세요");
      titleRef.current?.focus();
    } else if (!uploadCover && !galleryCover) {
      alert("커버 이미지를 추가해주세요.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // } else if (courseList.length < 2) {
      //   alert("2개 이상의 코스를 등록해주세요.");
    } else {
      updateCourse({
        courseId: paramId,
        location: selectedRegions,
        hashtags: selectedLabels,
        title: courseTitle,
        cover: uploadCover || galleryCover,
        courseList: JSON.stringify(editedList),
        travelStatus,
      });

      alert("정상적으로 수정이 완료되었습니다.");
      navigate(`/course/${course?.id}`);
      dispatch(replaceAllData([]));
    }
  };

  const onClickCancel = () => {
    if (window.confirm("이 페이지에서 나가시겠습니까?")) {
      navigate(`/course/${paramId}`);
      dispatch(replaceAllData([]));
    }
  };

  return (
    <div className="mb-64">
      <PostHeader
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
      />
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <EditCourseTitle
          regionsRef={regionsRef}
          titleRef={titleRef}
          setTravelStatus={setTravelStatus}
          travelStatus={travelStatus}
          filterRegion={filterRegion}
          regions={regions}
          setRegions={setRegions}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          filterTags={filterTags}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        <EditCourseMap initLists={course} />
        <button
          onClick={() => updateCourseHandler()}
          className="w-[280px] bg-black text-white text-lg py-3 mx-auto"
        >
          수정
        </button>
        <button
          onClick={onClickCancel}
          className="w-[280px] bg-black text-white text-lg py-3 mx-auto"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
