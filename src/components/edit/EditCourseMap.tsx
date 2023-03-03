import React, { useEffect, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import { PostSearchModal } from "../post";
import { EditCourseInfo, EditCourseMarkers } from "./index";
import { useSelector } from "react-redux";
import { kakaoPagenation } from "../../hooks";

const EditCourseMap = ({ initLists, modalOpen, setModalOpen }: any) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [boundsInfo, setBoundsInfo] = useState({});
  const [map, setMap] = useState();
  let fbBounds: any;
  let reduxBounds: any;

  const fbLists = JSON.parse(initLists.courseList);
  const reduxLists = useSelector((state: any) => state.courseSlice.courseList);

  const filteredId = useSelector((state: any) => state.courseSlice.filteredId);

  fbLists.map((item: any) => {
    if (item.id === filteredId) {
      fbBounds = Object.setPrototypeOf(
        item.bounds,
        kakao.maps.LatLngBounds.prototype
      );
    }
  });

  if (fbBounds === undefined) {
    reduxLists.map((item: any) => {
      if (item.id === filteredId) {
        reduxBounds = item.bounds;
      }
    });
  }

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const kakaoBounds = new kakao.maps.LatLngBounds();
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
          kakaoBounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          // @ts-ignore
          // bounds.ha = bounds.ha - 0.01;
          // @ts-ignore
          // bounds.oa = bounds.oa + 0.01;
        }

        // @ts-ignore
        map.panTo(kakaoBounds);
        kakaoPagenation(pagination);
        // @ts-ignore
        setSearchList(data);
        setSearchCnt(pagination.totalCount);
        setBoundsInfo(kakaoBounds);
        reduxBounds = kakaoBounds;
      }
    });
  }, [searchKeyword]);

  useEffect(() => {
    if (map !== undefined) {
      if (fbBounds !== undefined) {
        // @ts-ignore
        map.panTo(fbBounds);
      }
      if (reduxBounds !== undefined) {
        // @ts-ignore
        map.panTo(reduxBounds);
      }
    }
  }, [filteredId]);

  return (
    <div className="w-full flex h-full mb-20 xs:mb-6">
      <Map
        center={{
          lat: fbLists[0].position.lat,
          lng: fbLists[0].position.lng,
        }}
        level={5}
        // @ts-ignore
        onCreate={setMap}
        className="w-[688px] h-[1024px] z-0 xs:w-full xs:h-[600px]"
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
          boundsInfo={boundsInfo} // 안쓰는 데이터
        />
      )}
    </div>
  );
};

export default EditCourseMap;
