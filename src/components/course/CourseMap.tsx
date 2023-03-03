import React, { useEffect, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import { CourseInfo, CourseMapMarker } from "./index";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseMap = ({ course }: any) => {
  const [map, setMap] = useState();
  const [filteredId, setFilteredId] = useState("");
  const lists = JSON.parse(course?.courseList);
  let bounds: any;

  lists?.map((item: any) => {
    if (item.id === filteredId) {
      bounds = Object.setPrototypeOf(
        item.bounds,
        kakao.maps.LatLngBounds.prototype
      );
    }
  });

  useEffect(() => {
    if (map !== undefined) {
      // @ts-ignore
      map.panTo(bounds);
    }
  }, [filteredId]);

  return (
    <div className="w-full flex h-full mb-20 xs:mb-6">
      <Map
        center={{
          lat: lists[0].position.lat,
          lng: lists[0].position.lng,
        }}
        level={8}
        // @ts-ignore
        onCreate={setMap}
        className="w-[688px] h-[1024px] z-0 xs:w-full xs:h-[600px]"
      >
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <CourseMapMarker
          courseList={lists}
          filteredId={filteredId}
          setFilteredId={setFilteredId}
        />
      </Map>
      <CourseInfo
        courseList={lists}
        filteredId={filteredId}
        setFilteredId={setFilteredId}
      />
    </div>
  );
};

export default CourseMap;
