import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { SearchModal } from "../common";
import { EditCourseInfo } from "./index";
import { MapMarkers } from "../common";
import { useSelector } from "react-redux";
import { useKakaoMap } from "../../hooks";

const EditCourseMap = ({ modalOpen, setModalOpen }: any) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  useKakaoMap(map, searchKeyword, setSearchList, setSearchCnt);

  return (
    <div className="w-full flex h-full mb-20 xs:mb-6">
      <Map
        center={{
          lat:
            filteredIdx === ""
              ? lists[0]?.position.lat
              : filteredIdx === -1
              ? 37.566826
              : lists[filteredIdx]?.position.lat,
          lng:
            filteredIdx === ""
              ? lists[0]?.position.lng
              : filteredIdx === -1
              ? 126.9786567
              : lists[filteredIdx].position.lng,
        }}
        level={3}
        // @ts-ignore
        onCreate={setMap}
        className="w-[70%] h-[1024px] z-0 xs:w-full xs:h-[600px]"
      >
        <MapMarkers />
      </Map>
      <EditCourseInfo />
      {modalOpen && (
        <SearchModal
          setModalOpen={setModalOpen}
          setSearchKeyword={setSearchKeyword}
          searchList={searchList}
          setSearchList={setSearchList}
          searchCnt={searchCnt}
          searchKeyword={searchKeyword}
        />
      )}
    </div>
  );
};

export default EditCourseMap;
