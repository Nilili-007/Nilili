import { FiMinus } from "react-icons/fi";
import { useDeleteCourse } from "../../hooks";

interface Props {
  idx: number;
}
const CourseDeleteBtn = ({ idx }: Props) => {
  const deleteCourse = useDeleteCourse();

  return (
    <FiMinus
      onClick={() => deleteCourse(idx)}
      className="text-[26px] text-gray-04 -ml-5"
    />
  );
};

export default CourseDeleteBtn;
