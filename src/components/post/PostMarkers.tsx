import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { filterCourse } from "../../redux/modules/temporarySlice";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";

// 1. 마커 or 카드 클릭시 해당 아이템의 id dispatch
// 2. courseList 중 좌표 정보가 일치하는 아이템의 id를 filteredId 저장
// 3. 각각의 컴포넌트에서 현재 아이템 id가 filteredId 일치한다면 스타일 지정

const PostMarkers = () => {
  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  let polyline: any = [];
  courseList.map((item: any) => {
    polyline.push(item.position);
  });

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
  };

  return (
    <>
      {courseList.map((item: any, index: number) => (
        <div key={index}>
          <div onClick={() => onClickGetId(item)}>
            <CustomOverlayMap position={item.position}>
              <InfoWindow className={item.id === filteredId ? "clicked" : " "}>
                <MdLocationOn className="mt-1 -ml-1 mr-1" /> {item.name}
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

export default PostMarkers;

export const InfoWindow = styled.div`
  position: relative;
  background: black;
  color: white;
  margin-top: -75px;
  padding: 9px 15px;
  font-size: 20px;
  font-weight: bold;
  opacity: 0.6;
  display: flex;
  /* &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -7px;
    margin-bottom: -7px;
  } */
  &.clicked {
    opacity: 1;
  }
`;

export const Marker = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: black;
  color: white;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  &.clicked {
    background: black;
    width: 45px;
    height: 45px;
    opacity: 1;
  }
  &:after {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background: black;
    color: white;
  }
`;
