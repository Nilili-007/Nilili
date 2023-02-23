import React from "react";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseHeader = ({ course }: CourseProps) => {
  console.log(course);
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
        <div className="flex w-full bg-yellow-200 z-20">
          <h1 className=" -mt-44 z-20 absolute text-6xl font-bold w-full">
            {course?.title}
            <span className="mt-[20px] ml-3 z-20 absolute text-lg font-bold text-black bg-white opacity-80 rounded-lg px-2 py-1">
              {course?.travelStatus === true ? "여행 후" : "여행 전"}
            </span>
          </h1>
        </div>
        <div className="-mt-24 z-20 absolute text-2xl flex">
          {course?.location.map((location: any) => {
            return (
              <p className="pr-2" key={location}>
                #{location}
              </p>
            );
          })}{" "}
          코스를 소개해드릴게요!
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
