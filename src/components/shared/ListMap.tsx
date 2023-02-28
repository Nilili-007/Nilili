import { Map } from "react-kakao-maps-sdk";

import ListMapMarker from "./ListMapMarker";
import { useEffect, useState, useMemo, useRef } from "react";

interface ListProps {
  course: CourseType;
}

const ListMap = ({ course }: ListProps) => {
  const courseList = JSON.parse(course.courseList);

  const [map, setMap] = useState<kakao.maps.Map>();

  let Arr: PositionType[] = [];
  courseList.forEach((point: CourseListType) => Arr.push(point.position));

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    Arr.forEach((point) => {
      bounds.extend(
        new kakao.maps.LatLng(Number(point.lat), Number(point.lng))
      );
    });
    return bounds;
  }, [courseList]);

  useEffect(() => {
    if (map) map.setBounds(bounds);
  }, [Arr]);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: courseList[0].position.lat,
        lng: courseList[0].position.lng,
      }}
      style={{
        // 지도의 크기
        width: "300px",
        height: "300px",
      }}
      level={8} // 지도의 확대 레벨
      onCreate={setMap}
      draggable={false} //드래그 금지
      zoomable={false} //줌 금지
    >
      <ListMapMarker courseList={courseList} />
    </Map>
  );
};

export default ListMap;
