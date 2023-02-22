import React, { useEffect, useRef, useState } from "react";
import { hashTagOptions } from "../components/post/PostHashTag";
import { regionOptions } from "../components/post/PostTitle";
import { PostHeader } from "../components/post";
import { addCourse } from "../redux/modules/temporarySlice";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  // EditCourseMap,
  EditCourseTitle,
} from "../components/edit";

const EditCourse = () => {
  const paramId = useParams().id;
  const { data } = useGetCourseQuery();
  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const course = filterData?.pop();
  const navigate = useNavigate();

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
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const prevCourseLists: any = course?.courseList;
  const tripCourse = JSON.parse(prevCourseLists);
  const [lists, setLists] = useState(courseList);

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
    setLists(tripCourse);
    if (courseList.length < 1) {
      tripCourse.forEach((course: any) => dispatch(addCourse(course)));
    }
    setGalleryCover(course?.cover);
  }, []);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();
  const updateCourseHandler = (id: string | undefined) => {
    const selectedRegions = ragions?.map((region: any) => region.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);
    if (selectedRegions?.length === 0) {
      alert("지역을 1곳 이상 선택해 주세요");
      ragionsRef.current?.focus();
    } else if (!courseTitle?.trim()) {
      alert("제목을 입력해주세요");
      titleRef.current?.focus();
    } else if (!uploadCover && !galleryCover) {
      alert("커버이미지를 선택해주세요.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // } else if (courseList.length < 2) {
      //   alert("2개 이상의 코스를 등록해주세요.");
    } else {
      updateCourse({
        courseId: id,
        location: selectedRegions,
        hashtags: selectedLabels,
        title: courseTitle,
        cover: uploadCover || galleryCover,
        courseList: JSON.stringify(courseList),
        travelStatus,
      });
      alert("정상적으로 수정이 완료되었습니다.");
      setLists("");
      navigate(`/course/${course?.id}`);
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
          ragionsRef={ragionsRef}
          titleRef={titleRef}
          setTravelStatus={setTravelStatus}
          travelStatus={travelStatus}
          filterRagion={filterRegion}
          ragions={ragions}
          setRagions={setRagions}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          filterTags={filterTags}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        {/* <EditCourseMap
          lists={lists}
          updateCourseHandler={updateCourseHandler}
          paramId={paramId}
          setLists={setLists}
          courseList={courseList}
        /> */}
        <button onClick={() => navigate(`/course/${paramId}`)}>취소</button>
        <button onClick={() => updateCourseHandler(paramId)}>수정</button>
      </div>
    </div>
  );
};

export default EditCourse;
