import React from "react";

interface HashTagProps {
  course: CourseType | undefined;
}

const CourseHashTag = ({ course }: HashTagProps) => {
  return (
    <div className="py-5 border-b-2 border-[#A0A4A8]">
      {/* <h3 className="text-[28px] font-bold mb-5">관련 해시태그</h3> */}
      <div className="flex gap-3">
        {course?.hashtags.map((hashtag) => {
          return (
            <h3
              key={hashtag}
              className="bg-gray-300 px-4 sm:px-5 py-[12px] flex justify-center text-[20px] font-medium"
            >
              {hashtag}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default CourseHashTag;
