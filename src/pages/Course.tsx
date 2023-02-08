import CommentInput from "../components/course/CommentInput";
import CourseHashTag from "../components/course/CourseHashTag";
import CourseTitle from "../components/course/CourseTitle";
import LikeBtn from "../components/course/LikeBtn";

const Course = () => {
  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      <CourseTitle />
      <CourseHashTag />
      <LikeBtn />
    </div>
  );
};

export default Course;
