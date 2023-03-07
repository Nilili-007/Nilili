import { useDispatch } from "react-redux";
import { filterCourse } from "../redux/modules/courseSlice";

const useFilterCourse = () => {
  const dispatch = useDispatch();

  const getIdx = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
  };

  return getIdx;
};

export default useFilterCourse;
