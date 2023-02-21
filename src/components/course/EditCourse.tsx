import React, { useEffect, useState } from "react";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostTitle";
import { PostHeader } from "../post";
import { addCourse } from "../../redux/modules/temporarySlice";
import { useUpdateCourseMutation } from "../../redux/modules/apiSlice";
import EditCourseTitle from "./EditCourseTitle";
import { useDispatch, useSelector } from "react-redux";
import EditCourseMap from "./EditCourseMap";

interface EditCourseProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  paramId: string | undefined;
  course: CourseType | undefined;
}

const EditCourse = ({ setIsEdit, paramId, course }: EditCourseProps) => {
  // 기존 select로 선택했던 내용 불러오기
  const filterRagion = regionOptions.filter((ragion) =>
    course?.location.includes(ragion.value)
  );
  const filterTags = hashTagOptions.filter((hashTag) =>
    course?.hashtags.includes(hashTag.label)
  );

  const [courseTitle, setCourseTitle] = useState<string | undefined>("");

  //지역 선택
  const [ragions, setRagions] = useState<any | null>([]);

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(false);

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<any | null>([]);

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
    setRagions(filterRagion);
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
    const selectedRagions = ragions?.map((ragion: any) => ragion.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);
    updateCourse({
      courseId: id,
      location: selectedRagions,
      hashtags: selectedLabels,
      title: courseTitle,
      cover: uploadCover || galleryCover,
      courseList: JSON.stringify(courseList),
      travelStatus,
    });
    alert("정상적으로 수정이 완료되었습니다.");
    setIsEdit(false);
    setLists("");
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
          setTravelStatus={setTravelStatus}
          travelStatus={travelStatus}
          filterRagion={filterRagion}
          ragions={ragions}
          setRagions={setRagions}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          filterTags={filterTags}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        <EditCourseMap
          lists={lists}
          updateCourseHandler={updateCourseHandler}
          paramId={paramId}
          setLists={setLists}
          courseList={courseList}
        />
        <button onClick={() => setIsEdit(false)}>취소</button>
      </div>
    </div>
  );
};

export default EditCourse;
