import React from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker } from "../post/PostMarkers";
import { useDispatch, useSelector } from "react-redux";
import { filterCourse } from "../../redux/modules/courseSlice";
import { MdLocationOn } from "react-icons/md";

const EditCourseMarkers = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredId = useSelector((state: any) => state.courseSlice.filteredId);

  let polyline: any = [];
  lists.map((item: any) => {
    polyline.push(item.position);
  });

  const onClickGetId = (item: any, idx: number) => {
    const newInfo = {
      id: item.id,
      idx,
    };
    dispatch(filterCourse(newInfo));
  };

  return (
    <>
      {lists.map((item: any, idx: number) => (
        <div key={idx}>
          <div onClick={() => onClickGetId(item, idx)}>
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

export default EditCourseMarkers;
