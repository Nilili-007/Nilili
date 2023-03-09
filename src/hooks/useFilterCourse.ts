import { useDispatch } from "react-redux";
import { filterCourse } from "../redux/modules/courseSlice";

const useFilterCourse = () => {
  const dispatch = useDispatch();

  const getIdx = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    event.stopPropagation();
    dispatch(filterCourse(idx));
  };

  return getIdx;
};

export default useFilterCourse;
