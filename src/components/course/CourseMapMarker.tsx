import React from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker } from "../post/PostMarkers";
import { MdLocationOn } from "react-icons/md";

const CourseMapMarker = ({ courseList, filteredId, setFilteredId }: any) => {
  let polyline: any = [];
  courseList.map((item: any) => {
    polyline.push(item.position);
  });

  const onClickGetId = (item: any) => {
    setFilteredId(item.id);
  };

  return (
    <>
      {courseList.map((item: any, idx: number) => (
        <div key={item.id}>
          <div onClick={() => onClickGetId(item)}>
            <CustomOverlayMap position={item.position}>
              <InfoWindow className={item.id === filteredId ? "clicked" : " "}>
                <MdLocationOn className="mt-1 -ml-1 mr-1" /> {item.name}
              </InfoWindow>
            </CustomOverlayMap>
            <CustomOverlayMap position={item.position}>
              <Marker className={item.id === filteredId ? "clicked" : " "}>
                <span className="font-bold text-white absolute z-[99]">
                  #{idx + 1}
                </span>{" "}
              </Marker>
            </CustomOverlayMap>
          </div>
          <Polyline
            path={polyline}
            strokeWeight={3}
            strokeColor={"black"}
            strokeOpacity={1}
            strokeStyle={"solid"}
          />
        </div>
      ))}
    </>
  );
};

export default CourseMapMarker;
