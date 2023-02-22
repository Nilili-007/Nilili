import React, { useEffect, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import { PostSearchModal, PostCourseInfo, PostMarkers } from "./index";
import { useSelector } from "react-redux";
import { displayPagination } from "../../utils/kakao";

const PostMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [boundsInfo, setBoundsInfo] = useState({});
  const [map, setMap] = useState();

  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
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
          // @ts-ignore
          // bounds.ha = bounds.ha - 0.01;
          // @ts-ignore
          // bounds.oa = bounds.oa + 0.01;
        }

        // @ts-ignore
        map.panTo(bounds);
        displayPagination(pagination);
        // @ts-ignore
        setSearchList(data);
        setSearchCnt(pagination.totalCount);
        setBoundsInfo(bounds);
      }
    });
  }, [searchKeyword]);

  useEffect(() => {
    if (map !== undefined) {
      // @ts-ignore
      map.panTo(boundsInfo);
    }
  }, [filteredId]);

  return (
    <div className="w-full flex h-[70vh]">
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        level={5}
        // @ts-ignore
        onCreate={setMap}
        className="w-[65%] h-full z-0"
      >
        <PostMarkers />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <PostCourseInfo
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setBoundsInfo={setBoundsInfo}
      />
      {modalOpen && (
        <PostSearchModal
          setModalOpen={setModalOpen}
          setSearchKeyword={setSearchKeyword}
          searchList={searchList}
          setSearchList={setSearchList}
          searchCnt={searchCnt}
          boundsInfo={boundsInfo}
        />
      )}
    </div>
  );
};

export default PostMap;
