import { useDispatch } from "react-redux";
import { upCourse } from "../redux/modules/courseSlice";

const useUpCourse = () => {
  const dispatch = useDispatch();

  const liftUp = (idx: number) => {
    dispatch(upCourse(idx));
  };

  return liftUp;
};

export default useUpCourse;
