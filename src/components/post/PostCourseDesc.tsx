import { useSelector } from "react-redux";

const PostCourseDesc = ({ item }: any) => {
  const courseList = useSelector((state: any) => state.courseSlice.courseList);

  return (
    <div className="w-full h-auto mt-3 text-gray-04">
      {courseList.length > 0 ? (
        <>
          <p>{item.address}</p>
          <p>{item.road}</p>
          <p>{item.phone}</p>
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default PostCourseDesc;
