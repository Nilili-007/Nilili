import { useState } from "react";
import { useSelector } from "react-redux";
import { PostTextarea } from ".";

// 선택한 여행지 정보 및 설명 반환하기
// 1. Post - 데이터 배열로 관리(여행지, 순서)
// 2. Post - useState로 여행지 선택 관리
// 3. Post - 1번 배열에 map을 적용해서 여행지 갯수만큼 원 반환
// 4. Post - 원 클릭시 setState(배열[인덱스].여행지)
// 5. Desc - Props로 받아온 여행지 정보 반환
// 6. Desc - 첫 렌더링시 예외 처리(첫 번째 여행지 반환)

const PostCourseDesc = ({ item }: any) => {
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
          />
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default PostCourseDesc;
