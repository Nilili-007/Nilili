import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { SearchModal } from "../common";
import { PostCourse } from "./index";
import { MapMarkers } from "../common";
import { useSelector } from "react-redux";
import { useKakaoMap } from "../../hooks";

const PostMap = ({ modalOpen, setModalOpen }: any) => {
  const [searchKeyword, setSearchKeyword] = useState<any | null>("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );
  // console.log("post map:", searchKeyword);
  // useKakaoMap(searchKeyword);
  // const boundsMap = useKakaoMap;
  // boundsMap(searchKeyword);

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    const kakaoPagenation = (pagination: any) => {
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
            filteredIdx === "" || filteredIdx === -1
              ? 37.566826
              : lists[filteredIdx]?.position.lat,
          lng:
            filteredIdx === "" || filteredIdx === -1
              ? 126.9786567
              : lists[filteredIdx].position.lng,
        }}
        level={4}
        // @ts-ignore
        onCreate={setMap}
        className="w-[70%] h-[1024px] z-0 xs:w-full xs:h-[600px]"
      >
        <MapMarkers />
      </Map>
      <PostCourse />
      {modalOpen && (
        <SearchModal
          setModalOpen={setModalOpen}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchList={searchList}
          setSearchList={setSearchList}
          searchCnt={searchCnt}
        />
      )}
    </div>
  );
};

export default PostMap;
