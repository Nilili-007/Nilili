import { useSelector } from "react-redux";

const PostCourseDesc = ({ item }: any) => {
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  return (
    <div className="w-full h-auto ml-3 mt-1">
      {courseList.length > 0 ? (
        <>
          <p>{item.address}</p>
          <p className="text-gray-400 text-sm">{item.road}</p>
          <p>{item.phone}</p>
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default PostCourseDesc;
