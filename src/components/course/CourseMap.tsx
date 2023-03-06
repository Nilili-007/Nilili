import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { CourseInfo, CourseMapMarker } from "./index";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseMap = ({ course, filteredIdx, setFilteredIdx }: any) => {
  const [map, setMap] = useState();
  const lists = JSON.parse(course?.courseList);
  let bounds: any;

  lists?.map((item: any, idx: number) => {
    if (idx === filteredIdx) {
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
  }, [filteredIdx]);

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
        <CourseMapMarker
          lists={lists}
          filteredIdx={filteredIdx}
          setFilteredIdx={setFilteredIdx}
        />
      </Map>
      <CourseInfo
        courseList={lists}
        filteredIdx={filteredIdx}
        setFilteredIdx={setFilteredIdx}
      />
    </div>
  );
};

export default CourseMap;
