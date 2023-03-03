import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { authService } from "../../utils/firebase";
import { galleryLists } from "./index";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";

interface PostProps {
  uploadCover: string;
  setUploadCover: Dispatch<SetStateAction<any>>;
  galleryCover: string;
  setGalleryCover: Dispatch<SetStateAction<any>>;
  courseTitle?: any;
  titleRef?: any;
  setCourseTitle?: any;
}

const PostHeader = ({
  uploadCover,
  setUploadCover,
  galleryCover,
  setGalleryCover,
  courseTitle,
  titleRef,
  setCourseTitle,
}: PostProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("업로드");
  const coverRef = useRef<HTMLInputElement>(null);
  let file: any;

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

  const onChangeUploadCover = () => {
    if (coverRef.current?.files) {
      file = coverRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadCover(reader.result as any);
      };
    }
  };

  const onClickSelectCover = (e: any) => {
    if (e.target.currentSrc) {
      setGalleryCover(e.target.currentSrc);
      setUploadCover(undefined);
    }
  };

  const onClickRemoveCover = async () => {
    setUploadCover("");
    setGalleryCover("");
  };

  return (
    <div className="h-[220px] sm:h-[450px] md:h-[700px] text-white">
      <img
        src={
          (uploadCover || galleryCover) !== undefined
            ? uploadCover || galleryCover
            : ""
        }
        className="w-full h-[220px] sm:h-[450px] md:h-[700px] object-cover z-0"
      />
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[85%] md:w-[70%] pt-36 m-auto -mt-[270px] sm:-mt-[350px]">
        <input
          className="w-[85%] sm:w-[80%] md:w-[70%] sm:px-2 sm:py-1.5 text-[24px] sm:text-4xl md:text-5xl font-bold z-40 absolute bg-transparent mt-3 md:-mt-4 placholder:text-white zinc-50 focus:outline-0"
          placeholder="제목을 입력해주세요."
          autoFocus={true}
          value={courseTitle}
          ref={titleRef}
          onChange={(event) => {
            setCourseTitle(event.target.value);
          }}
        />
        <p className="mt-[48px] sm:mt-[68px] z-20 absolute text-[14px] sm:text-lg">
          {authService.currentUser?.displayName}님만의 여정을 직접 그려보세요!
        </p>
        <div className="flex mt-16 sm:mt-[100px]">
          <button
            onClick={onClickShowModal}
            className="bg-black px-1 sm:px-2 py-1 mt-2 mr-3 z-20 text-[12px] sm:badge"
          >
            {uploadCover || galleryCover ? "Change Cover" : "Add Cover"}
          </button>
          <button
            onClick={() => onClickRemoveCover()}
            className="bg-none border border-white px-1 sm:px-2 py-1 mt-2 mr-3 z-20  text-[12px] sm:badge"
          >
            Remove Cover
          </button>
        </div>
      </div>
      {modalOpen && (
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
