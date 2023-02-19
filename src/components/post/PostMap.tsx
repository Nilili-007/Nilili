import React, { useEffect, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import PostSearchModal from "./PostSearchModal";
import PostCourseInfo from "./PostCourseInfo";
import PostMarkers from "./PostMarkers";
import { useSelector } from "react-redux";

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
      const displayPagination = (pagination: any) => {
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

        // @ts-ignore
        while (paginationEl.hasChildNodes()) {
          // @ts-ignore
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          // @ts-ignore
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        // @ts-ignore
        paginationEl.appendChild(fragment);
      };

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
          bounds.ha = bounds.ha - 0.01;
          // @ts-ignore
          bounds.oa = bounds.oa + 0.01;
        }

        // @ts-ignore
        map.panTo(bounds);
        displayPagination(pagination);
        // @ts-ignore
        setSearchList(data);
        setSearchCnt(pagination.totalCount);
        setBoundsInfo(bounds);
        // @ts-ignore
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
