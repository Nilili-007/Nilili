import styled from "styled-components";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseHeader = ({ course }: CourseProps) => {
  return (
    <>
      <div className="h-[220px] sm:h-[450px] md:h-[700px]">
        <img
          alt="대표 이미지"
          src={course?.cover}
          className="w-full h-[220px] sm:h-[450px] md:h-[700px] object-cover z-0"
        />
      </div>
      <div className="  w-full h-[220px] -mt-[220px] sm:h-[450px] sm:-mt-[450px] md:h-[700px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="flex justify-center">
        <Information
          className={Number(course?.title?.length) > 28 ? "double-line" : ""}
        >
          <div className="  w-full z-20 flex flex-col">
            <h1 className="z-20 sm:text-4xl md:text-5xl font-bold leading-tight xs:text-2xl xs:w-full xs:-mt-6 flex items-end h-[100px]">
              {course?.title}
            </h1>
            <p className="z-20 text-xs sm:text-[17px] sm:leading-6 lg:text-lg font-bold text-black bg-white opacity-80 sm:h-auto sm:top-0 xs:w-[65px] sm:w-[70px] lg:w-[85px] mt-4 text-center sm:mt-3 xs:mt-2 py-1 xs:py-1">
              {course?.travelStatus === true ? "여행 후기" : "여행 계획"}
            </p>
          </div>
          <div className="mt-4 z-20 body3 sm:text-2xl flex xs:mt-1 sm:mt-3 text-white">
            {course?.location.map((location: string) => {
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
  width: 60%;
  color: white;
  position: absolute;
  margin-top: -260px;

  @media screen and (max-width: 768px) {
    width: 80%;
    margin-top: -235px;
  }
  @media screen and (max-width: 414px) {
    width: 90.7%;
    left: 5%;
    margin-top: -150px;
  }
`;
