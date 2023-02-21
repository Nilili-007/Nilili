import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { filterCourse } from "../../redux/modules/temporarySlice";
import styled from "styled-components";

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

export default PostMarkers;

const InfoWindow = styled.div`
  position: relative;
  background: white;
  color: gray;
  border-radius: 0.4em;
  margin-top: -70px;
  padding: 3px 10px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 5px 5px 8px gray;

  &:after {
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
  }
  &.clicked {
    color: black;
  }
`;

const Marker = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: gray;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &.clicked {
    background: black;
    width: 45px;
    height: 45px;
  }
`;
