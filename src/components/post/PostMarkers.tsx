import React, { useEffect, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";

// 1. 검색 결과에서 장소 선택시 markers(좌표) 추가
// 2. position에 courseList의 markers 대입

const PostMarkers = () => {
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  let line: any = [];

  courseList.map((item: any) => {
    line.push(item.position);
  });

  return (
    <>
      {courseList.map((item: any, index: number) => (
        <>
          <MapMarker
            key={index}
            position={item.position}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
            title={item.name}
          >
            <div className="cursor-pointer p-1 font-bold text-lg border border-gray-600 bg-white h-[60px] w-[150px] flex justify-center items-center hover:bg-black hover:text-white">
              #{index + 1} {item.name}
            </div>
          </MapMarker>
          <Polyline
            path={line}
            strokeWeight={4}
            strokeColor={"black"}
            strokeOpacity={1}
            strokeStyle={"solid"}
          />
        </>
      ))}
    </>
  );
};

export default PostMarkers;
