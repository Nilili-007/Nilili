interface HashTagProps {
  course: CourseType | undefined;
}

const CourseHashTag = ({ course }: HashTagProps) => {
  return (
    <div className="py-5 border-b-2 border-[#A0A4A8]">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {course?.hashtags.map((hashtag) => {
          return (
            <h3
              key={hashtag}
              className="bg-gray-300 px-1 sm:px-2 md:px-5 py-[10px] flex justify-center text-[12px] md:text-[16px] font-medium"
            >
              #{hashtag}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default CourseHashTag;
