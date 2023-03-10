import { Dispatch, SetStateAction, useRef, useState } from "react";
import { authService } from "../../utils/firebase";
import { galleryLists } from "../post/index";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";

interface PostProps {
  uploadCover: string | undefined;
  setUploadCover: Dispatch<SetStateAction<string | undefined>>;
  galleryCover: string;
  setGalleryCover: Dispatch<SetStateAction<string>>;
  courseTitle: string | undefined;
  titleRef?: any;
  setCourseTitle: Dispatch<SetStateAction<string | undefined>>;
}

const PostInfo = ({
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

  const selectCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;

    if (eventTarget.innerText !== "업로드") {
      setCategory("갤러리");
    }
    if (eventTarget.innerText !== "갤러리") {
      setCategory("업로드");
    }
  };

  const uploadCoverImg = () => {
    if (coverRef.current?.files) {
      file = coverRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadCover(reader.result as SetStateAction<string | undefined>);
        setModalOpen(false);
      };
    }
  };

  const selectCoverImg = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const eventTarget = e.target as HTMLImageElement;

    if (eventTarget.currentSrc) {
      setGalleryCover(eventTarget.currentSrc);
      setUploadCover(undefined);
      setModalOpen(false);
    }
  };

  const deleteCoverImg = async () => {
    setUploadCover("");
    setGalleryCover("");
  };

  return (
    <div className="h-[220px] sm:h-[450px] md:h-[700px] xs:h-[220px] text-white">
      {uploadCover || galleryCover ? (
        <img
          src={uploadCover || galleryCover}
          className="w-full h-[220px] sm:h-[450px] md:h-[700px]  xs:h-[220px] object-cover z-0"
        />
      ) : (
        <div className="w-full h-[220px] sm:h-[450px] md:h-[700px]  xs:h-[220px] object-cover z-0" />
      )}
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 flex justify-center items-center">
        {uploadCover === "" && galleryCover === "" ? (
          <div className="scale-[0.25] sm:scale-50 md:scale-100 absolute z-10 -mt-14">
            <img src="/assets/empty-img.png" />
          </div>
        ) : null}
      </div>
      <div className="w-[85%] md:w-[70%] m-auto -mt-[220px] sm:-mt-[170px] md:-mt-[220px] xs:w-[90%] xs:pt-[124px]">
        <input
          className="w-full relative sm:py-1.5 text-[24px] sm:text-2xl md:text-[46px] xs:text-xl font-bold z-40 bg-transparent placeholder:text-white focus:outline-0"
          placeholder="여기에 제목을 입력해주세요."
          maxLength={32}
          autoFocus={true}
          value={courseTitle}
          ref={titleRef}
          onChange={(event) => {
            setCourseTitle(event.target.value);
          }}
        />
        <div className="flex justify-between h-4">
          <p className="z-20 text-[14px] md:text-lg hidden xs:hidden sm:flex">
            {authService.currentUser?.displayName}님만의 여정을 직접 그려보세요!
          </p>
          {courseTitle && courseTitle.length > 32 ? (
            <p className="text-white text-xl z-20 drop-shadow-xl px-2 xs:text-[10px] xs:ml-auto xs:-mt-2">
              제목은 32자 이하로 작성해주세요.
            </p>
          ) : null}
        </div>
        <div className="flex sm:mt-2 md:mt-4 xs:mt-0">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black px-1 sm:px-2 py-1 mt-2 mr-3 z-20 text-[12px] sm:badge xs:text-[12px] xs:px-2"
          >
            {uploadCover || galleryCover ? "Change Cover" : "Add Cover"}
          </button>
          <button
            onClick={() => deleteCoverImg()}
            className="bg-none border border-white px-1 sm:px-2 py-1 mt-2 mr-3 z-20 text-[12px] sm:badge xs:text-[12px] xs:px-2"
          >
            Remove Cover
          </button>
        </div>
      </div>
      {modalOpen && (
        <div className="w-[90%] h-[300px] lg:w-[700px] md:h-[300px] bg-white border border-gray-600 absolute sm:translate-x-[5.5%] md:translate-x-[36%] translate-y-[5%] z-[1000] xs:w-[90%] xs:translate-x-[5.5%]">
          <div className="w-[95%] m-auto py-1 xs:w-[90%]">
            <div className="border-b border-gray-600 mt-10" />
            <GrFormClose
              onClick={() => setModalOpen(false)}
              className="cursor-pointer text-4xl ml-auto -mt-10 -mr-1 xs:text-3xl xs:-mt-[33.5px]"
            />
            <div className="flex -mt-[26px]">
              <AddCoverCategory
                onClick={(e) => selectCategory(e)}
                className={category === "업로드" ? "clicked" : ""}
              >
                업로드
              </AddCoverCategory>
              <AddCoverCategory
                onClick={selectCategory}
                className={category === "갤러리" ? "clicked" : ""}
              >
                갤러리
              </AddCoverCategory>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              {category === "업로드" ? (
                <div className="flex flex-col justify-center items-center h-60">
                  <div className="w-40 flex justify-center items-center">
                    <button className="text-md px-3 py-2 leading-none border border-black text-black hover:bg-gray-100 mt-4 lg:mt-0">
                      <label htmlFor="changeimg">파일선택</label>
                    </button>
                    <input
                      hidden
                      id="changeimg"
                      type="file"
                      placeholder="파일선택"
                      ref={coverRef}
                      onChange={uploadCoverImg}
                    />
                  </div>
                  <p className="text-black mt-3">
                    jpg, png, bmp 파일만 가능합니다.
                  </p>
                </div>
              ) : (
                <div className="overflow-y-scroll max-h-[236px]">
                  <div className="grid grid-cols-4 gap-3 text-black mt-4 w-full">
                    {galleryLists.map((item: string) => {
                      return (
                        <img
                          src={item}
                          key={item}
                          onClick={(e) => selectCoverImg(e)}
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

export default PostInfo;

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
