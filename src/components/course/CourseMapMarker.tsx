import React from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker } from "../post/PostMarkers";

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
      {courseList.map((item: any, index: number) => (
        <>
          <div onClick={() => onClickGetId(item)}>
            <CustomOverlayMap position={item.position}>
              <InfoWindow className={item.id === filteredId ? "clicked" : " "}>
                {item.name}
              </InfoWindow>
            </CustomOverlayMap>
            <CustomOverlayMap position={item.position}>
              <Marker className={item.id === filteredId ? "clicked" : " "}>
                <span className="font-bold">#{index + 1}</span>
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
        </>
      ))}
    </>
  );
};

export default CourseMapMarker;
