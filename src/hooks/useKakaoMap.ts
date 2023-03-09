import { Dispatch, SetStateAction, useEffect } from "react";

const useKakaoMap = (
  // @ts-ignore
  map,
  searchKeyword: string,
  setSearchList: Dispatch<SetStateAction<SearchListType[]>>,
  setSearchCnt: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
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

  useEffect(() => {
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
};

export default useKakaoMap;
