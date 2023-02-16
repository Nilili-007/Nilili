import { useState } from "react";
import { useSelector } from "react-redux";
import PostTextarea from "./PostTextarea";

const PostCourseDesc = ({ item, setOpenDesc }: any) => {
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
          {/* descList에 현재 아이템과 일치하는 id가 있다면 설명, 없다면 텍스트 입력창*/}
          {/* 텍스트 입력창 클릭시 장소 id 가져오기 */}
          {/* <PostTextarea
            item={item}
            id={filteredCourse.id ? filteredCourse.id : courseList[0].id}
            text={text}
            setText={setText}
            setOpenDesc={setOpenDesc}
          /> */}
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default PostCourseDesc;
