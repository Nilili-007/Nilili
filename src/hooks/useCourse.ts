import { useSelector } from "react-redux";

const useCourse = () => {
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  return { lists, filteredIdx };
};

export default useCourse;
