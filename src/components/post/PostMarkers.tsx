import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { filterCourse } from "../../redux/modules/courseSlice";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";

const PostMarkers = () => {
  const dispatch = useDispatch();
  const courseList = useSelector((state: any) => state.courseSlice.courseList);
  const filteredId = useSelector((state: any) => state.courseSlice.filteredId);

  let polyline: any = [];
  courseList.map((item: any) => {
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
      {courseList.map((item: any, idx: number) => (
        <div key={idx}>
          <div onClick={() => onClickGetId(item, idx)}>
            <CustomOverlayMap position={item.position}>
              <InfoWindow className={item.id === filteredId ? "clicked" : " "}>
                <MdLocationOn className="mt-1 -ml-1 mr-1" /> {item.name}
              </InfoWindow>
            </CustomOverlayMap>
            <CustomOverlayMap position={item.position}>
              <Marker className={item.id === filteredId ? "clicked" : " "}>
                <span className="font-bold">#{idx + 1}</span>
              </Marker>
            </CustomOverlayMap>
          </div>
          <Polyline
            path={polyline}
            strokeWeight={2}
            strokeColor={"black"}
            strokeOpacity={1}
            strokeStyle={"solid"}
          />
        </div>
      ))}
    </>
  );
};

export default PostMarkers;

export const InfoWindow = styled.div`
  position: relative;
  background: black;
  color: white;
  margin-top: -75px;
  padding: 6px 20px;
  font-size: 20px;
  font-weight: bold;
  opacity: 0.58;
  display: flex;
  &.clicked {
    opacity: 1;
    margin-top: -90px;
  }
`;

export const Marker = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 50px;
  background: black;
  color: white;
  opacity: 0.58;
  display: flex;
  justify-content: center;
  align-items: center;
  &.clicked {
    background: black;
    width: 43px;
    height: 43px;
    opacity: 1;
    &:after {
      content: "";
      position: absolute;
      background: black;
      border-radius: 50px;
      width: 72px;
      height: 72px;
      opacity: 0.6;
    }
  }
`;
