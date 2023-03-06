import { Map } from "react-kakao-maps-sdk";
import { CourseInfo, CourseMapMarker } from "./index";

interface CourseProps {
  course: CourseType | undefined;
}

const CourseMap = ({ course, filteredIdx, setFilteredIdx }: any) => {
  const lists = JSON.parse(course?.courseList);

  return (
    <div className="w-full flex h-full mb-20 xs:mb-6">
      <Map
        center={{
          lat:
            filteredIdx !== ""
              ? lists[filteredIdx].position.lat
              : lists[0].position.lat,
          lng:
            filteredIdx !== ""
              ? lists[filteredIdx].position.lng
              : lists[0].position.lng,
        }}
        level={3}
        className="w-[70%] h-[1024px] z-0 xs:w-full xs:h-[600px]"
      >
        <CourseMapMarker
          lists={lists}
          filteredIdx={filteredIdx}
          setFilteredIdx={setFilteredIdx}
        />
      </Map>
      <CourseInfo
        courseList={lists}
        filteredIdx={filteredIdx}
        setFilteredIdx={setFilteredIdx}
      />
    </div>
  );
};

export default CourseMap;
