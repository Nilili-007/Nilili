import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import PostSearchModal from "./PostSearchModal";
import PostCourseLine from "./PostCourseLine";

const PostMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [list, setList] = useState([]);
  const [markers, setMarkers] = useState([]);
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
        setMarkers(markers);
        // @ts-ignore
        map.setBounds(bounds);
        // @ts-ignore
        setList(data);
        sessionStorage.setItem("sessionList", JSON.stringify(data));
      }
    });
  }, [searchKeyword]);

  return (
    <div className="w-full">
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        level={3}
        // @ts-ignore
        onCreate={setMap}
        className="w-full h-96"
      >
        <MapMarker
          position={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
        />
      </Map>
      <PostCourseLine modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {modalOpen && (
        <PostSearchModal
          setModalOpen={setModalOpen}
          setSearchKeyword={setSearchKeyword}
        />
      )}
    </div>
  );
};

export default PostMap;
