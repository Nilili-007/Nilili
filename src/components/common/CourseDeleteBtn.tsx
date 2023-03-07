import { FiMinus } from "react-icons/fi";
import { useDeleteCourse } from "../../hooks";

const CourseDeleteBtn = ({ item, idx }: any) => {
  const deleteCourse = useDeleteCourse();

  return (
    <FiMinus
      onClick={() => deleteCourse(item, idx)}
      className="text-[26px] text-gray-04 -ml-5"
    />
  );
};

export default CourseDeleteBtn;
