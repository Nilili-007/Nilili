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
      <div className="w-[85%] left-[15%] -mt-52 text-white absolute xs:left-[5%] xs:-mt-28">
        <div className=" w-full z-20 flex">
          <h1 className="z-20 text-5xl font-bold leading-tight w-[70%] xs:text-xl xs:w-[90%]">
            {course?.title}
            <span className="ml-1 z-20 text-xs sm:text-lg font-bold text-black bg-white opacity-80 px-2 py-1 sm:h-auto sm:top-0 xs:px-1.5 xs:py-0.5 ">
              {course?.travelStatus === true ? "여행 후" : "여행 전"}
            </span>
          </h1>
        </div>
        <div className="mt-4 z-20 body3 sm:text-2xl flex xs:mt-2">
          {course?.location.map((location: any) => {
            return (
              <p className="pr-2 z-20" key={location}>
                #{location}
              </p>
            );
          })}{" "}
          <p className="z-20">코스를 소개해드릴게요!</p>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
