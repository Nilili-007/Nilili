import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { AiFillPlusCircle } from "react-icons/ai";
import PostSearchModal from "./PostSearchModal";
import styled from "styled-components";

interface IPlacelist {
  name: string;
}

interface PostProps {
  placeList: IPlacelist[];
  setPlaceList: Dispatch<SetStateAction<any>>;
}

const PostMap = ({ placeList, setPlaceList }: PostProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [list, setList] = useState([]);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  const showModal = () => {
    sessionStorage.clear();
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
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
  }, [place]);

  return (
    <div className="w-full">
      <SearchBtn>
        <AiFillPlusCircle
          className="text-6xl cursor-pointer xs:text-4xl text-white "
          onClick={showModal}
        />
      </SearchBtn>
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
      {modalOpen && (
        <PostSearchModal
          setModalOpen={setModalOpen}
          setPlace={setPlace}
          placeList={placeList}
          list={list}
        />
      )}
    </div>
  );
};

export default PostMap;

const SearchBtn = styled.button`
  z-index: 999;
  position: absolute;
  right: 16%;
  top: 17%;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: black;
  @media screen and (max-width: 414px) {
    top: 20%;
    right: 8%;
    width: 20px;
    height: 20px;
  }
`;
