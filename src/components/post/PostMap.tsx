import React, { useEffect, useState } from "react";
import { Map, ZoomControl, MapTypeControl } from "react-kakao-maps-sdk";
import PostSearchModal from "./PostSearchModal";
import PostCourseLine from "./PostCourseInfo";
import PostMarkers from "./PostMarkers";

const PostMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
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
        map.setBounds(bounds);
        // @ts-ignore
        setSearchList(data);
      }
    });
  }, [searchKeyword]);

  return (
    <div className="w-full flex mb-6">
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        level={8}
        // @ts-ignore
        onCreate={setMap}
        className="w-[65%] h-[70vh]"
      >
        <PostMarkers />
        {/* <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} /> */}
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <PostCourseLine modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {modalOpen && (
        <PostSearchModal
          setModalOpen={setModalOpen}
          setSearchKeyword={setSearchKeyword}
          searchList={searchList}
          setSearchList={setSearchList}
        />
      )}
    </div>
  );
};

export default PostMap;
