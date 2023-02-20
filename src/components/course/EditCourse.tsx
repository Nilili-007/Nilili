import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { optionType } from "../../pages/Post";
import { authService } from "../../utils/firebase";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostTitle";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import PostMarkers from "../post/PostMarkers";
import { PostSearchModal } from "../post";
import PostCourseInfo from "../post/PostCourseInfo";
import styled from "styled-components";

interface EditCourseProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCourse = ({ setIsEdit }: EditCourseProps) => {
  const navigate = useNavigate();
  const userID = authService.currentUser?.uid;

  //지역 선택
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

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
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);
  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }

  //지도
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchCnt, setSearchCnt] = useState<number | null>();
  const [map, setMap] = useState();
  const [boundsInfo, setBoundsInfo] = useState({});

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
          <div className="w-[15%] xs:w-1/3 xs:text-xs ">
            <Select
              options={regionOptions}
              placeholder={"지역"}
              autoFocus={true}
              onChange={(event: any) => {
                setCategory(event.value);
              }}
              value={regionOptions.filter(function (option) {
                return option.value === category;
              })}
              className="z-10"
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
            options={hashTagOptions}
            placeholder={"#해시태그"}
            value={selectedTags}
            onChange={handleTagSelect}
            isMulti
            isSearchable={true}
            isClearable={true}
            className="z-10"
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
