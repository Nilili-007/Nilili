import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";

const PostHeader = () => {
  const [modelOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("업로드");
  const [galleryImg, setGalleryImg] = useState("");
  const galleryLists = [
    "https://cdn.pixabay.com/photo/2020/05/21/11/37/road-5200366_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/06/20/12/07/castle-2422860_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/05/11/57/mountain-2582947_1280.jpg",
  ];

  const onClickShowModal = () => {
    setModalOpen(true);
  };

  const onClickCategory = (e: any) => {
    if (e.target.innerText !== "업로드") {
      setCategory("갤러리");
    }
    if (e.target.innerText !== "갤러리") {
      setCategory("업로드");
    }
  };

  const onClickSelectCover = (e: any) => {
    if (e.target.currentSrc) {
      setGalleryImg(e.target.currentSrc);
      setModalOpen(false);
    }
  };

  const onClickRemoveCover = () => {
    setGalleryImg("");
  };

  return (
    <div className="h-[700px] text-white">
      <img
        src={galleryImg !== undefined ? galleryImg : ""}
        className="w-full h-[700px] object-cover z-0"
      />
      <div className="w-full h-[700px] -mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[70%] pt-36 m-auto -mt-[350px]">
        <h1 className="text-5xl font-bold z-20 absolute">DRAW MY PATH</h1>
        <p className="mt-[72px] z-20 absolute">
          유저님만의 여정을 직접 그려보세요!
        </p>
        <div className="flex mt-[100px]">
          <button
            onClick={onClickShowModal}
            className="bg-black px-2 py-1 mt-2 mr-3 z-20"
          >
            {galleryImg ? "Change Cover" : "Add Cover"}
          </button>
          <button
            onClick={() => onClickRemoveCover()}
            className="bg-none border border-white px-2 py-1 mt-2 mr-3 z-20"
          >
            Remove Cover
          </button>
        </div>
      </div>
      {modelOpen && (
        <div className="w-[700px] h-[240px] bg-white border border-gray-600 absolute translate-x-[34%] translate-y-[5%] z-[1000]">
          <div className=" w-[95%] m-auto py-1">
            <div className="border-b border-gray-600 mt-10" />
            <GrFormClose
              onClick={() => setModalOpen(false)}
              className="cursor-pointer text-4xl ml-auto -mt-10 -mr-1"
            />
            <div className="flex -mt-[26px]">
              <AddCoverCategory
                onClick={(e) => onClickCategory(e)}
                className={category === "업로드" ? "clicked" : ""}
              >
                업로드
              </AddCoverCategory>
              <AddCoverCategory
                onClick={onClickCategory}
                className={category === "갤러리" ? "clicked" : ""}
              >
                갤러리
              </AddCoverCategory>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              {category === "업로드" ? (
                <div className="w-[665px] h-48 flex justify-center items-center">
                  <input type="file" className="w-[190px] text-black" />
                </div>
              ) : (
                <div className="grid grid-cols-4 justify-between text-black mt-4 w-full">
                  {galleryLists.map((item: string) => {
                    return (
                      <img
                        src={item}
                        key={item}
                        onClick={(e) => onClickSelectCover(e)}
                        className="cursor-pointer w-[155px] h-[70px]"
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHeader;

const AddCoverCategory = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #9ca3af;
  padding: 0 8px 2px 8px;
  &:last-child {
    margin-left: 20px;
  }
  &.clicked {
    color: black;
    border-bottom: 2px solid black;
  }
`;
