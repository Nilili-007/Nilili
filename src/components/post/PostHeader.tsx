import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { authService } from "../../utils/firebase";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
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

  const onClickUploadCover = async (event: any) => {
    event.preventDefault();
    setModalOpen(false);

    if (coverRef.current?.files) {
      const file = coverRef.current.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `covers/${file.name}`);

      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url: string) => {
          setUploadCover(url);
          setGalleryCover(undefined);
        });
      });
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
    <div className="h-[220px] sm:h-[450px] md:h-[700px]  xs:h-[220px] text-white">
      <img
        src={
          (uploadCover || galleryCover) !== undefined
            ? uploadCover || galleryCover
            : ""
        }
        className="w-full h-[220px] sm:h-[450px] md:h-[700px]  xs:h-[220px] object-cover z-0"
      />
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-[85%] md:w-[70%] pt-36 m-auto -mt-[270px] sm:-mt-[300px] xs:w-[90%]">
        {uploadCover === "" && galleryCover === "" ? (
          <div className="scale-[0.25] sm:scale-50 md:scale-100 sm:top-[40%] md:top-[50%] left-[50%] -translate-x-1/2  -translate-y-1/2 absolute z-10">
            <img src="/assets/empty-img.png" />
          </div>
        ) : null}
        <input
          className="w-[85%] sm:w-[80%] md:w-[70%] sm:py-1.5 text-[24px] sm:text-2xl md:text-[46px] font-bold z-40 absolute bg-transparent mt-6 sm:mt-1 md:-mt-10 placeholder:text-white focus:outline-0"
          placeholder="여기에 제목을 입력해주세요."
          autoFocus={true}
          value={courseTitle}
          ref={titleRef}
          onChange={(event) => {
            setCourseTitle(event.target.value);
          }}
        />
        <p className="sm:mt-[50px] md:mt-[40px] z-20 absolute text-[14px] sm:text-lg hidden xs:hidden sm:flex">
          {authService.currentUser?.displayName}님만의 여정을 직접 그려보세요!
        </p>
        <div className="flex mt-16 sm:mt-[80px]">
          <button
            onClick={onClickShowModal}
            className="bg-black px-1 sm:px-2 py-1 mt-2 mr-3 z-20 text-[12px] sm:badge xs:text-[14px]"
          >
            {uploadCover || galleryCover ? "Change Cover" : "Add Cover"}
          </button>
          <button
            onClick={() => onClickRemoveCover()}
            className="bg-none border border-white px-1 sm:px-2 py-1 mt-2 mr-3 z-20 text-[12px] sm:badge xs:text-[14px]"
          >
            Remove Cover
          </button>
        </div>
      </div>
      {modalOpen && (
        <div className="w-[90%] h-[300px] lg:w-[700px] md:h-[300px] bg-white border border-gray-600 absolute sm:translate-x-[5.5%] lg:translate-x-[34%] translate-y-[5%] z-[1000] xs:w-[90%]">
          <div className="w-[95%] m-auto py-1 xs:w-[90%]">
            <div className="border-b border-gray-600 mt-10" />
            <GrFormClose
              onClick={(event) => onClickUploadCover(event)}
              className="cursor-pointer text-4xl ml-auto -mt-10 -mr-1 xs:text-3xl xs:-mt-[33.5px]"
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
                <div className="md:w-[665px] h-60 flex justify-center items-center">
                  <input
                    type="file"
                    ref={coverRef}
                    onChange={onChangeUploadCover}
                    className="w-[85%] md:w-[50%] text-black text-center bg-gray-02"
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
                          className="cursor-pointer w-[160px] h-[70px] xs:object-cover"
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
  @media screen and (max-width: 414px) {
    font-size: 16px;
    padding: 0 8px 4px 8px;
    &:last-child {
      margin-left: 5px;
    }
  }
`;
