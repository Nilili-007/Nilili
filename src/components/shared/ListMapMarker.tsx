import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface CourseMapMarkerProps {
  courseList: CourseListType[];
}

const ListMapMarker = ({ courseList }: CourseMapMarkerProps) => {
  let polyline: { lat: number; lng: number }[] = [];
  courseList.map((item: CourseListType) => polyline.push(item.position));
  return (
    <>
      {courseList.map((item: CourseListType, index: number) => (
        <div key={item.id + index}>
          <div>
            <CustomOverlayMap position={item.position}></CustomOverlayMap>
            <CustomOverlayMap position={item.position}>
              <Marker>
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

export default ListMapMarker;

export const Marker = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`;
