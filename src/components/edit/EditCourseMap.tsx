import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { PostSearchModal } from "../post";
import { EditCourseInfo, EditCourseMarkers } from "./index";
import { useSelector } from "react-redux";
import { kakaoPagenation } from "../../hooks";

const EditCourseMap = ({ modalOpen, setModalOpen }: any) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // @ts-ignore
        map.panTo(bounds);
        kakaoPagenation(pagination);
        // @ts-ignore
        setSearchList(data);
        setSearchCnt(pagination.totalCount);
      }
    });
  }, [searchKeyword]);

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
        <EditCourseMarkers />
      </Map>
      <EditCourseInfo />
      {modalOpen && (
        <PostSearchModal
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
