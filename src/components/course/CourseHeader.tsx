import React from "react";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseHeader = ({ course }: CourseProps) => {
  return (
    <>
      <div className="h-[220px] sm:h-[450px] md:h-[700px]">
        <img
          src={course?.cover}
          className="w-full h-[220px] sm:h-[450px] md:h-[700px] object-cover z-0"
        />
      </div>
      <div className="w-full h-[220px] -mt-[220px] sm:h-[450px] sm:-mt-[450px] md:h-[700px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[85%] md:w-[70%] mx-auto text-white">
        <div className=" w-full bg-yellow-200 z-20">
          <h1 className="-mt-20 sm:-mt-44 z-20 absolute title2 sm:text-5xl font-bold w-[85%]">
            {course?.title}
            <span className="mt-0 sm:mt-[20px] ml-3 z-20 absolute text-xs sm:text-lg font-bold text-black bg-white opacity-80 px-2 py-1 sm:h-auto top-[6px] sm:top-0 ">
              {course?.travelStatus === true ? "여행 후" : "여행 전"}
            </span>
          </h1>
        </div>
        <div className="-mt-[44px] sm:-mt-24 z-20 absolute body3 sm:text-2xl flex">
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
