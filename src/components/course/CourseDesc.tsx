interface IPlaceList {
  name: string;
}

interface PostProps {
  targetPlace: string;
  placeList: IPlaceList[];
}

// 선택한 여행지 정보 및 설명 반환하기
// 1. Post - 데이터 배열로 관리(여행지, 순서)
// 2. Post - useState로 여행지 선택 관리
// 3. Post - 1번 배열에 map을 적용해서 여행지 갯수만큼 원 반환
// 4. Post - 원 클릭시 setState(배열[인덱스].여행지)
// 5. Desc - Props로 받아온 여행지 정보 반환
// 6. Desc - 첫 렌더링시 예외 처리(첫 번째 여행지 반환)

const CourseDesc = ({ targetPlace, placeList }: PostProps) => {
  return (
    <>
      <div className="w-1/2 h-[106px] justify-end xs:w-full xs:-mt-5">
        <h3 className="font-bold text-xl">
          {targetPlace ? targetPlace : placeList[0].name}
        </h3>
        <p>주소</p>
        <p className="text-gray-400 text-sm">(도로명 주소)</p>
        <p>000-0000-0000</p>
        {/* <div className="mt-4">
          유저가 작성한 여행지 설명 유저가 작성한 여행지 설명 유저가 작성한
          여행지 설명 유저가 작성한 여행지 설명 유저가 작성한 여행지 설명 유저가
          작성한 여행지 설명 유저가 작성한 여행지 설명 유저가 작성한 여행지 설명
          유저가 작성한 여행지 설명
        </div> */}
      </div>
    </>
  );
};

export default CourseDesc;
