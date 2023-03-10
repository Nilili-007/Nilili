import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { InfoWindow, Marker, MobileMarker } from "../common/MapMarkers";
import { MdLocationOn } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";

interface CourseProps {
  lists: CourseListType[];
  filteredIdx: number | string;
  setFilteredIdx: Dispatch<SetStateAction<number>>;
}

const CourseMapMarker = ({
  lists,
  filteredIdx,
  setFilteredIdx,
}: CourseProps) => {
  let polyline: { lat: number; lng: number }[] = [];
  lists.map((item: CourseListType) => {
    polyline.push(item.position);
  });

  return (
    <>
      {lists.map((item: CourseListType, idx: number) => (
        <div key={item.id + idx}>
          <div onClick={() => setFilteredIdx(idx)}>
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
            strokeStyle={"dashed"}
          />
        </div>
      ))}
      {lists.length > 0 ? (
        <div className="xs:border-r-2 xs:border-dashed xs:border-black xs:w-4 xs:h-[600px] xs:right-[14%] xs:absolute xs:overflow-y-scroll" />
      ) : null}
      <div className="xs:w-[50px] xs:h-[600px] xs:flex xs:flex-col xs:absolute xs:right-[7.5%] xs:overflow-y-scroll">
        {lists.map((item: CourseListType, idx: number) => (
          <div key={item.id + idx} className="xs:flex xs:justify-center">
            <MobileMarker
              onClick={() => setFilteredIdx(idx)}
              className={idx === filteredIdx ? "clicked" : " "}
            >
              <span className="font-bold text-white absolute z-[99]">
                {idx === filteredIdx ? `#${idx + 1}` : null}
              </span>
            </MobileMarker>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseMapMarker;
