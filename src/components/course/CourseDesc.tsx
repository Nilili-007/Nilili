// interface IPlaceList {
//   name: string;
//   address: string;
//   road: string;
//   phone: string;
// }

// interface PostProps {
//   targetPlace: any;
//   placeList: IPlaceList[];
// }

// 선택한 여행지 정보 및 설명 반환하기
// 1. Post - 데이터 배열로 관리(여행지, 순서)
// 2. Post - useState로 여행지 선택 관리
// 3. Post - 1번 배열에 map을 적용해서 여행지 갯수만큼 원 반환
// 4. Post - 원 클릭시 setState(배열[인덱스].여행지)
// 5. Desc - Props로 받아온 여행지 정보 반환
// 6. Desc - 첫 렌더링시 예외 처리(첫 번째 여행지 반환)

const CourseDesc = () => {
  return (
    <>
      {/* <div className="w-1/2 h-[106px] justify-end xs:w-full xs:-mt-5">
       <h3 className="font-bold text-xl">
         {targetPlace === "" ? placeList[0].name : targetPlace.name}
       </h3>
       <p>{targetPlace === "" ? placeList[0].address : targetPlace.address}</p>
       <p className="text-gray-400 text-sm">
         {targetPlace === "" ? placeList[0].road : targetPlace.road}
       </p>
       <p>{targetPlace === "" ? placeList[0].phone : targetPlace.phone}</p>
     </div> */}
    </>
  );
};

export default CourseDesc;
