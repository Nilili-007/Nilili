import { useSelector } from "react-redux";

// 선택한 여행지 정보 및 설명 반환하기
// 1. Post - 데이터 배열로 관리(여행지, 순서)
// 2. Post - useState로 여행지 선택 관리
// 3. Post - 1번 배열에 map을 적용해서 여행지 갯수만큼 원 반환
// 4. Post - 원 클릭시 setState(배열[인덱스].여행지)
// 5. Desc - Props로 받아온 여행지 정보 반환
// 6. Desc - 첫 렌더링시 예외 처리(첫 번째 여행지 반환)

const PostCourseDesc = () => {
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredCourse = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  return (
    <div className="flex mt-5 mb-10">
      <div className="w-1/2 h-96 border border-black mr-4 flex justify-center items-center xs:hidden">
        사진
      </div>
      <div className="w-1/2 h-[106px] justify-end xs:w-full xs:-mt-5">
        {courseList.length > 0 ? (
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">
              {filteredCourse.name ? filteredCourse.name : courseList[0].name}
            </h3>
            <p>
              {filteredCourse.address
                ? filteredCourse.address
                : courseList[0].address}
            </p>
            <p className="text-gray-400 text-sm">
              {filteredCourse.road ? filteredCourse.road : courseList[0].road}
            </p>
            <p>
              {filteredCourse.phone
                ? filteredCourse.phone
                : courseList[0].phone}
            </p>

            <textarea
              placeholder="여행지를 소개해주세요."
              className="h-60 justify-end border border-black p-3 mt-4 xs:h-40"
            />
            <button className="bg-gray-200 border border-black px-2 mt-3 float-right">
              등록
            </button>
          </div>
        ) : (
          <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
        )}
      </div>
    </div>
  );
};

export default PostCourseDesc;
