import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { optionType } from "../../pages/Post";
import { authService } from "../../utils/firebase";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostTitle";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import PostMarkers from "../post/PostMarkers";
import { PostCourseDesc, PostSearchModal, PostTextarea } from "../post";
import styled from "styled-components";
import { AiOutlineDown, AiOutlinePlus, AiOutlineUp } from "react-icons/ai";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  filterCourse,
  upCourse,
} from "../../redux/modules/temporarySlice";
import { TiMinus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCourseMutation } from "../../redux/modules/apiSlice";

interface EditCourseProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  paramId: string | undefined;
  course: CourseType | undefined;
}

const EditCourse = ({ setIsEdit, paramId, course }: EditCourseProps) => {
  const navigate = useNavigate();
  const userID = authService.currentUser?.uid;
  const [courseTitle, setCourseTitle] = useState<string | undefined>("");
  // 기존 select로 선택했던 내용 불러오기
  const filterRagion = regionOptions.filter((ragion) =>
    course?.location.includes(ragion.value)
  );
  const filterTags = hashTagOptions.filter((hashTag) =>
    course?.hashtags.includes(hashTag.label)
  );

  //지역 선택
  const [ragions, setRagions] = useState<any | null>([]);
  const handleCategorySelect = (data: any) => {
    setRagions(data);
  };
  const regionLimit = 4;

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(false);
  const onClickStatus = (e: any) => {
    if (e.target.innerText === "여행 전") {
      setTravelStatus(false);
    }
    if (e.target.innerText === "여행 후") {
      setTravelStatus(true);
    }
  };

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<any | null>([]);
  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }
  const tagLimit = 5;

  //지도
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const [boundsInfo, setBoundsInfo] = useState({});

  // const filteredId = useSelector(
  //   (state: any) => state.temporarySlice.filteredId
  // );

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
  // }, [filteredId]);

  // 코스데이터
  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );
  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  const [lists, setLists] = useState(courseList);
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

  // 수정 전 내용 불러오기
  useEffect(() => {
    setCourseTitle(course?.title);
    if (course?.isDone === true) {
      setTravelStatus(true);
    } else {
      setTravelStatus(false);
    }
    setRagions(filterRagion);
    setSelectedTags(filterTags);
  }, []);

  // update mutation
  const [updateCourse] = useUpdateCourseMutation();
  const updateCourseHandler = (id: string | undefined) => {
    const selectedRagions = ragions?.map((ragion: any) => ragion.value);
    const selectedLabels = selectedTags?.map((tag: any) => tag.label);

    updateCourse({
      courseId: id,
      location: selectedRagions,
      hashtags: selectedLabels,
      title: courseTitle,
      // image,
      isDone: travelStatus,
      // places,
    });
    alert("정상적으로 수정이 완료되었습니다.");
    setIsEdit(false);
  };

  return (
    <div className="mb-64">
      <div className="h-64 bg-gray-100">
        <div className="w-[70%] pt-24 m-auto">
          <h1 className="text-5xl font-bold">DRAW MY PATH</h1>
          <p className="mt-4">유저님만의 여정을 직접 그려보세요!</p>
          <button className="bg-black text-white px-2 py-1 mt-2">
            Add Cover
          </button>
        </div>
      </div>
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">목적지를 추가해보세요.</p>
            <p className="text-gray-400 mt-1">
              간단한 클릭으로 여행지를 추가할 수 있어요.
            </p>
          </div>
          <div className="ml-auto">
            <div className="flex ">
              <Category
                onClick={(e) => onClickStatus(e)}
                className={travelStatus === false ? "clicked" : ""}
              >
                여행 전
              </Category>
              <div className="border-r border-gray-600 h-8 mx-3" />
              <Category
                onClick={(e) => onClickStatus(e)}
                className={travelStatus === true ? "clicked" : ""}
              >
                여행 후
              </Category>
            </div>
          </div>
        </div>
        <div className="flex items-center h-16 gap-4">
          <div className="w-[50%] xs:w-1/3 xs:text-xs ">
            <Select
              options={regionOptions}
              defaultValue={filterRagion}
              onChange={handleCategorySelect}
              isMulti
              className="z-20"
              classNamePrefix="select"
              isSearchable={true}
              isOptionDisabled={(ragion) =>
                ragions && ragions.length >= regionLimit
              }
            />
          </div>
          <input
            className="w-full px-2 py-1.5 border border-gray-400"
            value={courseTitle}
            onChange={(event) => {
              setCourseTitle(event.target.value);
            }}
          />
        </div>
        <div className="mb-8">
          <Select
            isMulti
            defaultValue={filterTags}
            placeholder={"#해시태그"}
            options={hashTagOptions}
            onChange={handleTagSelect}
            className="z-10"
            isSearchable={true}
            isOptionDisabled={(selectedTag) =>
              selectedTags && selectedTags.length >= tagLimit
            }
          />
        </div>
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
                        <PostTextarea
                          item={item}
                          text={text}
                          setText={setText}
                        />
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
        <button onClick={() => setIsEdit(false)}>취소</button>
      </div>
    </div>
  );
};

export default EditCourse;

const Category = styled.button`
  height: 32px;
  padding: 0 8px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;

  &.clicked {
    background: black;
    color: white;
  }
`;
