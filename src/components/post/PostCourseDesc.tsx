import { useState } from "react";
import { useSelector } from "react-redux";
import { PostTextarea } from ".";

// 선택한 여행지 정보 및 설명 반환하기
// 1. descList 조회
// 2. descList.map 실행

const PostCourseDesc = ({ item, key, setOpenDesc }: any) => {
  const [text, setText] = useState("");
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredCourse = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  return (
    <div className="w-full h-auto ml-3 mt-1">
      {courseList.length > 0 ? (
        <>
          <p>{item.address}</p>
          <p className="text-gray-400 text-sm">{item.road}</p>
          <p>{item.phone}</p>
          <PostTextarea
            id={filteredCourse.id ? filteredCourse.id : courseList[0].id}
            text={text}
            setText={setText}
            setOpenDesc={setOpenDesc}
          />
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default PostCourseDesc;
