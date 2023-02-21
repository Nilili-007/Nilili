import React, { useEffect, useRef, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import { CourseInfo, CourseMapMarker } from "./index";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseMap = ({ course }: any) => {
  const [map, setMap] = useState();
  const [filteredId, setFilteredId] = useState("");
  const courseList = JSON.parse(course?.courseList);
  let bounds: any;

  courseList.map((item: any) => {
    if (item.id === filteredId) {
      bounds = item.bounds;
      bounds = Object.setPrototypeOf(bounds, kakao.maps.LatLngBounds.prototype);
    }
  });

  useEffect(() => {
    if (map !== undefined) {
      // @ts-ignore
      map.panTo(bounds);
    }
  }, [filteredId]);

  return (
    <div className="flex w-full h-[70vh] my-14">
      <Map
        center={{
          lat: courseList[0].position.lat,
          lng: courseList[0].position.lng,
        }}
        level={8}
        // @ts-ignore
        onCreate={setMap}
        className="w-[65%] h-full z-0"
      >
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <CourseMapMarker
          courseList={courseList}
          filteredId={filteredId}
          setFilteredId={setFilteredId}
        />
      </Map>
      <CourseInfo
        courseList={courseList}
        filteredId={filteredId}
        setFilteredId={setFilteredId}
      />
    </div>
  );
};

export default CourseMap;
