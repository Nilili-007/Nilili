import React from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker } from "../post/PostMarkers";
import { useDispatch, useSelector } from "react-redux";
import { filterCourse } from "../../redux/modules/temporarySlice";

const EditCourseMarkers = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: any) => state.temporarySlice.courseList);
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  let polyline: any = [];
  lists.map((item: any) => {
    polyline.push(item.position);
  });

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
  };

  return (
    <>
      {lists.map((item: any, index: number) => (
        <div key={index}>
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
        </div>
      ))}
    </>
  );
};

export default EditCourseMarkers;
