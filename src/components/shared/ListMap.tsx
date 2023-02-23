import { Map } from "react-kakao-maps-sdk";

import ListMapMarker from "./ListMapMarker";

interface ListProps {
  course: CourseType;
}

const ListMap = ({ course }: ListProps) => {
  const courseList = JSON.parse(course.courseList);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: courseList[0].position.lat,
        lng: courseList[0].position.lng,
      }}
      style={{
        // 지도의 크기
        display: "none",
        width: "300px",
        height: "300px",
      }}
      level={11} // 지도의 확대 레벨
      draggable={false} //드래그 금지
      zoomable={false} //줌 금지
    >
      <ListMapMarker courseList={courseList} />
    </Map>
  );
};

export default ListMap;
