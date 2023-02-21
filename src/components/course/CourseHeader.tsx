import React from "react";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseHeader = ({ course }: CourseProps) => {
  return (
    <>
      <div className="h-[700px]">
        <img
          src={course?.cover}
          className="w-full h-[700px] object-cover z-0"
        />
      </div>
      <div className="w-full h-[700px] -mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[70%] mx-auto text-white">
        <h1 className=" -mt-44 z-20 absolute text-6xl font-bold">
          {course?.title}
        </h1>
      </div>
    </>
  );
};

export default CourseHeader;
