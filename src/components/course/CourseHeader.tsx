import styled from "styled-components";

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
      <div className="flex justify-center">
        <Information
          className={Number(course?.title.length) > 28 ? "double-line" : ""}
        >
          <div className=" w-full z-20 flex">
            <h1 className="z-20 text-5xl font-bold leading-tight xs:text-2xl xs:w-full xs:-mt-6">
              {course?.title}
            </h1>
            <p className="z-20 text-xs sm:text-[17px] sm:leading-6 lg:text-lg font-bold text-black bg-white opacity-80 sm:h-auto sm:top-0 xs:w-[50px] sm:w-[70px] lg:w-[85px] mt-4 text-center sm:mt-3 xs:mt-2 py-1 xs:py-0.5">
              {course?.travelStatus === true ? "여행 후" : "여행 전"}
            </p>
          </div>
          <div className="mt-4 z-20 body3 sm:text-2xl flex xs:mt-1 sm:mt-3 text-white">
            {course?.location.map((location: any) => {
              return (
                <p className="pr-2 z-20" key={location}>
                  #{location}
                </p>
              );
            })}{" "}
            <p className="z-20">코스를 소개해드릴게요!</p>
          </div>
        </Information>
      </div>
    </>
  );
};

export default CourseHeader;

const Information = styled.h1`
  width: 70%;
  color: white;
  position: absolute;
  margin-top: -160px;

  &.double-line {
    margin-top: -220px;
  }
  @media screen and (max-width: 414px) {
    width: 90%;
    left: 5%;
    margin-top: -55px;
    &.double-line {
      margin-top: -120px;
    }
  }
`;
