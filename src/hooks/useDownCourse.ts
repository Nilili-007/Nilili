import { useDispatch } from "react-redux";
import { downCourse } from "../redux/modules/courseSlice";

const useDownCourse = () => {
  const dispatch = useDispatch();

  const liftDown = (idx: number) => {
    dispatch(downCourse(idx));
  };

  return liftDown;
};

export default useDownCourse;
