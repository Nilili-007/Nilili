interface HashTagProps {
  course: CourseType | undefined;
}

const CourseHashTag = ({ course }: HashTagProps) => {
  return (
    <div className="py-5 border-b-2 border-[#A0A4A8]">
      <div className="flex justyfy-center gap-1.5 sm:gap-3">
        {course?.hashtags.map((hashtag) => {
          return (
            <h3
              key={hashtag}
              className="bg-gray-300 px-2 md:px-5 py-[12px] flex justify-center text-[12px] sm:text-[16px] md:text-[20px] font-medium"
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
