import { FiMinus } from "react-icons/fi";
import { useCourse } from "../../hooks";

interface Props {
  idx: number;
}
const CourseDeleteBtn = ({ idx }: Props) => {
  const { removeCourse } = useCourse();

  return (
    <FiMinus
      onClick={() => removeCourse(idx)}
      className="text-[26px] text-gray-04 -ml-5"
    />
  );
};

export default CourseDeleteBtn;
