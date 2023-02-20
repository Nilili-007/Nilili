import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import { authService } from "../../utils/firebase";

interface PostProps {
  coverImg: string;
  setCoverImg: Dispatch<SetStateAction<string>>;
}

const PostHeader = ({ coverImg, setCoverImg }: PostProps) => {
  const [modelOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("업로드");
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryLists = [
    "https://cdn.pixabay.com/photo/2020/05/21/11/37/road-5200366_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/06/20/12/07/castle-2422860_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/02/09/00/21/jusang-joint-4831628_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/09/26/23/00/han-river-4507176_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/07/06/22/55/cornus-5378575_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/31/15/07/seoul-7423593_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/04/11/00/04/sea-3309231_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/09/17/02/20/jeju-4482313_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/17/15/18/haeundae-beach-1987193_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/04/04/13/54/city-7111380_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/09/10/14/11/jeju-934479_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/14/06/33/jeju-2748098_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/05/07/52/republic-of-korea-5131925_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/02/08/06/18/bird-7000837_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/09/01/14/57/gamcheon-culture-village-6591589_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/09/02/07/07/south-korea-3648252_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/26/17/06/and-thu-2789325_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/08/01/03/40/autumn-leaves-3576458_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/01/29/09/36/snow-4801975_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/10/17/15/54/seoul-olympic-park-992727_1280.jpg",
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

  const onChangeUploadCover = (e: any) => {
    if (coverRef.current?.files) {
      const file = coverRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const changeImg = reader.result;
        setCoverImg(changeImg as any);
      };
    }
  };

  const onClickSelectCover = (e: any) => {
    if (e.target.currentSrc) {
      setCoverImg(e.target.currentSrc);
    }
  };

  const onClickRemoveCover = () => {
    setCoverImg("");
  };

  return (
    <div className="h-[700px] text-white">
      <img
        src={coverImg !== undefined ? coverImg : ""}
        className="w-full h-[700px] object-cover z-0"
      />
      <div className="w-full h-[700px] -mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[70%] pt-36 m-auto -mt-[350px]">
        <h1 className="text-5xl font-bold z-20 absolute">DRAW MY PATH</h1>
        <p className="mt-[68px] z-20 absolute text-lg">
          {authService.currentUser?.displayName}님만의 여정을 직접 그려보세요!
        </p>
        <div className="flex mt-[100px]">
          <button
            onClick={onClickShowModal}
            className="bg-black px-2 py-1 mt-2 mr-3 z-20"
          >
            {coverImg ? "Change Cover" : "Add Cover"}
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
        <div className="w-[700px] h-[300px] bg-white border border-gray-600 absolute translate-x-[34%] translate-y-[5%] z-[1000]">
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
                <div className="w-[665px] h-60 flex justify-center items-center">
                  <input
                    type="file"
                    ref={coverRef}
                    onChange={onChangeUploadCover}
                    className="w-[190px] text-black"
                  />
                </div>
              ) : (
                <div className="overflow-y-scroll max-h-[236px]">
                  <div className="grid grid-cols-4 gap-3 text-black mt-4 w-full">
                    {galleryLists.map((item: string) => {
                      return (
                        <img
                          src={item}
                          key={item}
                          onClick={(e) => onClickSelectCover(e)}
                          className="cursor-pointer w-[160px] h-[70px]"
                        />
                      );
                    })}
                  </div>
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
