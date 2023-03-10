import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { SearchModal, SearchModalAddCourseBtn } from "../common";
import { EditCourseInfo } from "./index";
import { MapMarkers } from "../common";
import { useCourse, useKakaoMap } from "../../hooks";

const EditCourseMap = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState<SearchListType[]>([]);
  const [searchCnt, setSearchCnt] = useState<number | undefined>();
  const [map, setMap] = useState();
  const { lists } = useCourse();
  const { filteredIdx } = useCourse();

  useKakaoMap(map, searchKeyword, setSearchList, setSearchCnt);

  return (
    <div>
      <div className="hidden xs:block xs:w-full xs:-mt-[18px] xs:-mb-3">
        <SearchModalAddCourseBtn setModalOpen={setModalOpen} />
      </div>
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
        <EditCourseInfo setModalOpen={setModalOpen} />
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
    </div>
  );
};

export default EditCourseMap;
