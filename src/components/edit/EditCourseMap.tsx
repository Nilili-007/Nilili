import React, { useEffect, useState } from "react";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/temporarySlice";
import { TiMinus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import PostMarkers from "../post/PostMarkers";
import { PostCourseDesc, PostSearchModal, PostTextarea } from "../post";
import { AiOutlineDown, AiOutlinePlus, AiOutlineUp } from "react-icons/ai";

interface EditMapProps {
  lists: any;
  updateCourseHandler: any;
  paramId: any;
  setLists: any;
  courseList: any;
}

const EditCourseMap = ({
  lists,
  updateCourseHandler,
  paramId,
  setLists,
  courseList,
}: EditMapProps) => {
  const dispatch = useDispatch();

  //지도
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const [boundsInfo, setBoundsInfo] = useState({});

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
  }, []);

  // 코스데이터
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  const [text, setText] = useState("");

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickDeleteCourse = (item: any) => {
    // 모달로 변경
    if (window.confirm("일정에서 삭제하시겠습니까?")) {
      dispatch(deleteCourse(item.id));
      dispatch(deleteMemo(item.id));
      setText("");
    }
  };

  const onClickUpCourse = (item: any) => {
    dispatch(upCourse(item));
  };

  const onClickDownCourse = (item: any) => {
    dispatch(downCourse(item));
  };

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
    setBoundsInfo(item.bounds);
  };

  useEffect(() => {
    setLists(courseList);
  }, [courseList]);

  return (
    <div>
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
        <div className="w-[35%] max-h-[62vh] pl-7 float-right">
          <div className="flex flex-col h-full overflow-y-scroll ">
            {lists?.map((item: any, key: any) => {
              return (
                <div
                  key={key}
                  onClick={() => onClickGetId(item)}
                  className={item.id === filteredId ? "clicked" : " "}
                >
                  <div className="w-full px-2 py-3 flex">
                    <div className="w-full">
                      <h4 className="pl-3 font-bold text-xl">
                        #{key + 1} {item.name}
                      </h4>
                      <PostCourseDesc item={item} />
                      <PostTextarea item={item} text={text} setText={setText} />
                    </div>
                    <TiMinus
                      onClick={() => onClickDeleteCourse(item)}
                      className="-mt-2 text-3xl text-gray-400 hover:text-black"
                    />
                  </div>
                  <div className="flex text-3xl p-3 -mt-5">
                    <AiOutlineUp
                      onClick={() => onClickUpCourse(item)}
                      className="hover:text-gray-400"
                    />
                    <AiOutlineDown
                      onClick={() => onClickDownCourse(item)}
                      className="hover:text-gray-400 ml-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={showModal}
            className="w-full border border-gray-400 py-2 flex justify-center"
          >
            <AiOutlinePlus className="text-5xl text-gray-300" />
          </button>
          <div className="flex justify-center">
            <button
              className="w-full bg-black text-white text-lg px-16 py-3 mt-5 mx-auto"
              onClick={() => updateCourseHandler(paramId)}
            >
              게시물 수정하기
            </button>
          </div>
        </div>
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
    </div>
  );
};

export default EditCourseMap;
