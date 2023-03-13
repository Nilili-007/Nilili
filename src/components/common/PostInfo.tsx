import { Dispatch, SetStateAction, useRef, useState } from "react";
import { authService } from "../../utils/firebase";
import styled from "styled-components";
import { DebouncedFunc } from "lodash";
import { galleryLists } from ".";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";
import { FadeLoader } from "react-spinners";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

interface PostProps {
  uploadCover: string | undefined;
  setUploadCover: Dispatch<SetStateAction<string | undefined>>;
  galleryCover: string | undefined;
  setGalleryCover: Dispatch<SetStateAction<string | undefined>>;
  courseTitle: string | undefined;
  titleRef?: React.RefObject<HTMLInputElement>;
  changeValueHandler: DebouncedFunc<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
  coverRef: React.RefObject<HTMLDivElement>;
  openCoverModal: boolean;
  setOpenCoverModal: Dispatch<SetStateAction<boolean>>;
}

const PostInfo = ({
  uploadCover,
  setUploadCover,
  galleryCover,
  setGalleryCover,
  courseTitle,
  titleRef,
  changeValueHandler,
  coverRef,
  openCoverModal,
  setOpenCoverModal,
}: PostProps) => {
  const [category, setCategory] = useState("갤러리");
  const fileRef = useRef<HTMLInputElement | any>(null);
  const [link, setLink] = useState("");
  const [loaded, setLoaded] = useState(true);
  let file: any;

  const selectCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const eventTarget = e.target as HTMLElement;

    if (eventTarget.innerText === "업로드") {
      setCategory("업로드");
    }
    if (eventTarget.innerText === "갤러리") {
      setCategory("갤러리");
    }
    if (eventTarget.innerText === "링크") {
      setCategory("링크");
    }
  };

  const uploadCoverImg = () => {
    setGalleryCover("");
    setUploadCover("");
    file = fileRef.current.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 2520,
    };
    const reader = new FileReader();
    const storage = getStorage();

    const resizeFile = async () => {
      setLoaded(false);
      try {
        const compressedFile = await imageCompression(file, options);
        const storageRef = ref(storage, `covers/${compressedFile.name}`);
        uploadBytes(storageRef, compressedFile).then(() => {
          getDownloadURL(storageRef).then((url) => {
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
              setUploadCover(url);
              setOpenCoverModal(false);
              setLoaded(true);
            };
          });
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    if (file.type === "image/heic" || file.type === "image/HEIC") {
      let blob = fileRef.current.files[0];
      heic2any({ blob, toType: "image/webp" }).then(function (resultBlob: any) {
        file = new File([resultBlob], file.name.split(".")[0] + ".webp", {
          type: "image/webp",
          lastModified: new Date().getTime(),
        });
        resizeFile();
      });
    }

    if (file.type !== "image/heic" || file.type !== "image/HEIC") {
      resizeFile();
    }
  };

  const selectCoverImg = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const eventTarget = e.target as HTMLImageElement;

    if (eventTarget.currentSrc) {
      setGalleryCover(eventTarget.currentSrc);
      setUploadCover(undefined);
      setOpenCoverModal(false);
    }
  };

  const uploadCoverLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGalleryCover(link);
    setOpenCoverModal(false);
    setLink("");
  };

  const deleteCoverImg = () => {
    setUploadCover("");
    setGalleryCover("");
  };

  return (
    <div className="h-[220px] sm:h-[450px] md:h-[500px] xs:h-[220px] text-white">
      {uploadCover || galleryCover ? (
        <img
          src={uploadCover || galleryCover}
          className="w-full h-[220px] sm:h-[450px] md:h-[500px] xs:h-[220px] object-cover z-0"
        />
      ) : (
        <div className="w-full h-[220px] sm:h-[450px] md:h-[500px]  xs:h-[220px] object-cover z-0" />
      )}
      <div className="w-full h-[220px] sm:h-[450px] md:h-[500px] -mt-[220px] sm:-mt-[450px] md:-mt-[500px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-full h-[220px] sm:h-[450px] md:h-[500px] -mt-[220px] sm:-mt-[450px] md:-mt-[500px] absolute z-10 flex justify-center items-center">
        {uploadCover === "" && galleryCover === "" ? (
          <div className="scale-[0.1] sm:scale-50 xs:scale-[0.3] absolute z-10 -mt-14">
            {!loaded ? (
              <FadeLoader color="#A0A4A8" margin={30} height={30} width={8} />
            ) : (
              <img src="/assets/empty-img.png" />
            )}
          </div>
        ) : null}
      </div>
      <div className="w-[85%] md:w-[70%] m-auto -mt-[220px] sm:-mt-[170px] md:-mt-[200px] xs:w-[90%] xs:pt-[124px]">
        <input
          className="w-full relative sm:py-1.5 text-[24px] sm:text-4xl md:text-4xl xs:text-2xl font-bold z-40 bg-transparent placeholder:text-white focus:outline-0 xs:focus:outline-0"
          placeholder="여기에 제목을 입력해주세요."
          maxLength={32}
          autoFocus={true}
          ref={titleRef}
          onChange={(event) => changeValueHandler(event)}
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
        <div className="flex sm:mt-2 md:mt-4 xs:-mt-3">
          <button
            onClick={() => setOpenCoverModal(true)}
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
      {openCoverModal && (
        <AddCoverModal
          ref={coverRef}
          className={category === "갤러리" ? "gallery" : ""}
        >
          <div className="w-[95%] m-auto py-1 xs:w-[90%]">
            <div className="border-b border-gray-600 mt-11" />
            <div className="flex -mt-[26px]">
              <AddCoverCategory
                onClick={selectCategory}
                className={category === "갤러리" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-3">갤러리</p>
              </AddCoverCategory>
              <AddCoverCategory
                onClick={(e) => selectCategory(e)}
                className={category === "업로드" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-3">업로드</p>
              </AddCoverCategory>
              <AddCoverCategory
                onClick={(e) => selectCategory(e)}
                className={category === "링크" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-3">링크</p>
              </AddCoverCategory>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              {category === "업로드" ? (
                <div className="flex flex-col justify-center items-center h-[200px]">
                  <button className="text-md px-3 py-2 leading-none border border-black text-black hover:bg-gray-100 mt-4 lg:mt-0">
                    <label htmlFor="changeimg">파일선택</label>
                  </button>
                  <input
                    hidden
                    id="changeimg"
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/heic,image/webp,image/avif"
                    placeholder="파일선택"
                    ref={fileRef}
                    onChange={uploadCoverImg}
                  />
                </div>
              ) : null}
              {category === "갤러리" ? (
                <div className="overflow-y-scroll xs:h-[420px] xs:pb-2">
                  <div className="grid grid-cols-4 gap-3 text-black mt-4 w-full">
                    {galleryLists.map((item: string) => {
                      return (
                        <img
                          src={item}
                          onClick={(e) => selectCoverImg(e)}
                          className="cursor-pointer w-[160px] h-[70px] xs:object-cover"
                        />
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {category === "링크" ? (
                <div className="w-full h-[200px] flex justify-center items-center">
                  <form
                    onSubmit={(e) => uploadCoverLink(e)}
                    className="xs:flex xs:flex-col"
                  >
                    <input
                      value={link}
                      placeholder="이미지 링크 붙여넣기"
                      onChange={(e) => setLink(e.target.value)}
                      className="w-[500px] h-10 border border-gray-04 px-2 py-1 text-black xs:w-full xs:h-8"
                    />
                    <button className="bg-black text-white h-10 px-6 ml-3 xs:h-8 xs:w-full xs:ml-0 xs:mt-2">
                      확인
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </AddCoverModal>
      )}
    </div>
  );
};

export default PostInfo;

const AddCoverModal = styled.div`
  width: 700px;
  height: 250px;
  background-color: white;
  border: 1px solid #a0a4a8;
  position: absolute;
  z-index: 999;
  left: 15%;
  margin-top: 30px;
  &.gallery {
    height: 724px;
  }
  @media screen and (max-width: 414px) {
    width: 90%;
    left: 5%;
    &.gallery {
      height: 480px;
    }
  }
`;

const AddCoverCategory = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #9ca3af;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    width: 70px;
  }
  &.clicked {
    color: black;
    border-bottom: 2px solid black;
    padding-bottom: 3px;
    margin-bottom: -5px;
  }
  @media screen and (max-width: 414px) {
    width: 68px;
    font-size: 16px;
    padding-bottom: 4px;
    &:last-child {
      width: 52px;
    }
  }
`;
