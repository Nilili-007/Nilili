import { useDispatch } from "react-redux";
import { filterCourse } from "../redux/modules/courseSlice";

const useFilterCourse = () => {
  const dispatch = useDispatch();

  const getIdx = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: any,
    idx: number
  ) => {
    event.stopPropagation();
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
  };

  return getIdx;
};

export default useFilterCourse;
