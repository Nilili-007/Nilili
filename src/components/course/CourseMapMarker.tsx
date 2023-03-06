import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker, MobileMarker } from "../post/PostMarkers";
import { MdLocationOn } from "react-icons/md";

const CourseMapMarker = ({ lists, filteredIdx, setFilteredIdx }: any) => {
  let polyline: any = [];
  lists.map((item: any) => {
    polyline.push(item.position);
  });

  const onClickGetId = (item: any, idx: number) => {
    setFilteredIdx(idx);
  };

  return (
    <>
      {lists.map((item: any, idx: number) => (
        <div key={item.id + idx}>
          <div onClick={() => onClickGetId(item, idx)}>
            <CustomOverlayMap position={item.position}>
              <InfoWindow className={idx === filteredIdx ? "clicked" : " "}>
                <MdLocationOn className="mt-1 -ml-1 mr-1" /> {item.name}
              </InfoWindow>
              {idx === filteredIdx ? (
                <div className="lg:hidden bg-black text-white text-[13px] px-3 py-1 flex font-bold -mt-[50px] -ml-14">
                  <MdLocationOn className="lg:hidden mt-1 -ml-1 mr-1" />
                  {item.name}
                </div>
              ) : null}
            </CustomOverlayMap>
            <CustomOverlayMap position={item.position}>
              <Marker className={idx === filteredIdx ? "clicked" : " "}>
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
      <div className="xs:w-[90px] xs:h-[600px] xs:flex xs:flex-col xs:absolute xs:right-6 xs:overflow-y-scroll">
        {lists.map((item: any, idx: number) => (
          <div key={item.id + idx} className="xs:flex xs:justify-center">
            <MobileMarker
              onClick={() => onClickGetId(item, idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <span className="font-bold text-white absolute z-[99]">
                #{idx + 1}
              </span>
            </MobileMarker>
          </div>
        ))}
        {lists.length > 0 ? (
          <div className="xs:border-r-4 xs:border-black xs:h-full xs:absolute xs:ml-[43px] " />
        ) : null}
      </div>
    </>
  );
};

export default CourseMapMarker;
