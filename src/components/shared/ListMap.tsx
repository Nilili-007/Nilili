import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import { CourseMapMarker } from "../course";
import { useEffect, useState } from "react";
import ListMapMarker from "./ListMapMarker";

interface ListProps {
  course: CourseType;
}

const ListMap = ({ course }: ListProps) => {
  const [map, setMap] = useState();
  const [filteredId, setFilteredId] = useState("");
  const courseList = JSON.parse(course.courseList);
  let bounds: any;

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: courseList[0].position.lat,
        lng: courseList[0].position.lng,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "300px",
      }}
      level={10} // 지도의 확대 레벨
      draggable={false} //드래그 금지
      zoomable={false} //줌 금지
    >
      <ListMapMarker courseList={courseList} />
    </Map>
  );
};

export default ListMap;
