import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { authService } from "../../utils/firebase";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import { DebouncedFunc } from "lodash";
import Swal from "sweetalert2";
import { galleryLists } from ".";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";
import { FadeLoader } from "react-spinners";

interface PostProps {
  uploadCover: any;
  setUploadCover: Dispatch<SetStateAction<string | undefined>>;
  galleryCover: string;
  setGalleryCover: Dispatch<SetStateAction<string>>;
  courseTitle: string | undefined;
  titleRef?: React.RefObject<HTMLInputElement>;
  changeValueHandler: DebouncedFunc<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
}

const PostInfo = ({
  uploadCover,
  setUploadCover,
  galleryCover,
  setGalleryCover,
  courseTitle,
  titleRef,
  changeValueHandler,
}: PostProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("갤러리");
  const coverRef = useRef<HTMLInputElement | any>(null);
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

  if (uploadCover?.length > 1048487) {
    setUploadCover("");
    Swal.fire({
      title: `<p style="font-size: 20px;">이미지 용량을 초과했습니다.</p>`,
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalOpen(true);
      }
    });
  }

  const uploadCoverImg = () => {
    setGalleryCover("");
    setUploadCover("");
    file = coverRef.current.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 2520,
    };
    const reader = new FileReader();
    const resizeFile = async () => {
      setLoaded(false);
      try {
        const compressedFile = await imageCompression(file, options);
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setUploadCover(reader.result as SetStateAction<string | undefined>);
          setModalOpen(false);
          setLoaded(true);
        };
      } catch (error) {
        console.log(error);
      }
    };

    if (file.type === "image/heic" || file.type === "image/HEIC") {
      let blob = coverRef.current.files[0];
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
    e: React.MouseEvent<HTMLImageElement, MouseEvent> | any
  ) => {
    const eventTarget = e.target as HTMLImageElement;

    if (eventTarget.currentSrc) {
      setGalleryCover(eventTarget.currentSrc);
      setUploadCover(undefined);
      setModalOpen(false);
    }
  };

  const uploadCoverLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGalleryCover(link);
    setModalOpen(false);
    setLink("");
  };

  const deleteCoverImg = () => {
    setUploadCover("");
    setGalleryCover("");
  };

  return (
    <div className="h-[220px] sm:h-[450px] md:h-[700px] xs:h-[220px] text-white">
      {uploadCover || galleryCover ? (
        <img
          src={uploadCover || galleryCover}
          className="w-full h-[220px] sm:h-[450px] md:h-[700px] xs:h-[220px] object-cover z-0"
        />
      ) : (
        <div className="w-full h-[220px] sm:h-[450px] md:h-[700px]  xs:h-[220px] object-cover z-0" />
      )}
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 bg-gradient-to-t from-[#00000060]" />
      <div className="w-full h-[220px] sm:h-[450px] md:h-[700px] -mt-[220px] sm:-mt-[450px] md:-mt-[700px] absolute z-10 flex justify-center items-center">
        {uploadCover === "" && galleryCover === "" ? (
          <div className="scale-[0.25] sm:scale-50 md:scale-100 absolute z-10 -mt-14">
            {!loaded ? (
              <FadeLoader color="#A0A4A8" margin={30} height={30} width={8} />
            ) : (
              <img src="/assets/empty-img.png" />
            )}
          </div>
        ) : null}
      </div>
      <div className="w-[85%] md:w-[70%] m-auto -mt-[220px] sm:-mt-[170px] md:-mt-[230px] xs:w-[90%] xs:pt-[124px]">
        <input
          className="w-full relative sm:py-1.5 text-[24px] sm:text-4xl md:text-5xl xs:text-2xl font-bold z-40 bg-transparent placeholder:text-white focus:outline-0"
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
        <AddCoverModal className={category === "갤러리" ? "gallery" : ""}>
          <div className="w-[95%] m-auto py-1 xs:w-[90%]">
            <div className="border-b border-gray-600 mt-11" />
            <GrFormClose
              onClick={() => setModalOpen(false)}
              className="cursor-pointer text-4xl ml-auto -mt-10 -mr-1 xs:text-3xl xs:-mt-[33.5px]"
            />
            <div className="flex -mt-[26px]">
              <AddCoverCategory
                onClick={selectCategory}
                className={category === "갤러리" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-1.5">갤러리</p>
              </AddCoverCategory>
              <AddCoverCategory
                onClick={(e) => selectCategory(e)}
                className={category === "업로드" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-1.5">업로드</p>
              </AddCoverCategory>
              <AddCoverCategory
                onClick={(e) => selectCategory(e)}
                className={category === "링크" ? "clicked" : ""}
              >
                <p className="pb-1.5 -mt-1.5">링크</p>
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
                    accept="image/jpg,image/png,image/jpeg,image/heic"
                    placeholder="파일선택"
                    ref={coverRef}
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
                      className="w-[500px] h-10 border border-gray-04 px-2 py-1 text-black xs:w-[320px] xs:h-8"
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
    /* transform: translateX(5.5%); */
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
    margin-bottom: -2px;
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
