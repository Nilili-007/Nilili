import React from "react";

interface HashTagProps {
  course: CourseType | undefined;
}

const CourseHashTag = ({ course }: HashTagProps) => {
  console.log(course);
  return (
    <div className="flex gap-3">
      {course?.hashtags.map((hashtag) => {
        return (
          <h3
            key={hashtag + Object.keys(hashtag)}
            className="bg-gray-300 px-4 sm:px-5 py-1 rounded-xl flex justify-center"
          >
            {hashtag}
          </h3>
        );
      })}
    </div>
  );
};

export default CourseHashTag;
