import { getAuth, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { authService, storage } from "../../utils/firebase";
import Swal from "sweetalert2";

interface ProfileEditModal {
  profileEditModal: boolean;
  setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalOutClick: (e: React.MouseEvent) => void;
  modalRef: React.ForwardedRef<HTMLDivElement>;
}

const ProfileEdit = ({
  profileEditModal,
  setProfileEdit,
  modalRef,
  modalOutClick,
}: ProfileEditModal) => {
  const closeModal = () => {
    if (profileEditModal) {
      setProfileEdit(false);
      document.body.style.overflow = "unset";
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName: string | undefined | null = user?.displayName;
  const userImg: string | undefined | null = user?.photoURL;
  const userID = authService.currentUser?.uid;

  const [img, setImg] = useState(userImg);
  const [nickname, setNickname] = useState<string | any>(userName);

  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const changeImgFile = () => {
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const changeImg = reader.result;
        setImg(changeImg as string | null | undefined);
      };
    }
  };

  const profileEdit = async () => {
    const imgRef = ref(storage, `${authService.currentUser?.uid}${Date.now()}`);

    const imgDataUrl = img;
    let downloadUrl;
    if (imgDataUrl) {
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }
    updateProfile(authService.currentUser as any, {
      displayName: nickname,
      photoURL: downloadUrl ? downloadUrl : null,
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "프로필을 수정했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
        setProfileEdit(false);
        navigate(`/user/${userID}`);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const editNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const cancleBtn = () => {
    setImg(userImg);
    setNickname(userName);
    setProfileEdit(false);
  };

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      onClick={(e) => modalOutClick(e)}
      ref={modalRef}
    >
      <div className="relative w-full h-3/4 border border-gray-200 max-w-md md:h-auto">
        {/* modal contents */}
        <div className="border relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex justify-between items-center p-5 rounded-t ">
            <div></div>
            <h3 className="text-2xl font-bold">프로필 수정</h3>
            <button
              className="bg-transparent border-0 text-gray-400 font-extrabold text-xl"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div className="flex justify-center items-center ">
            <div className="border-b-2 border-solid border-black w-[90%]" />
          </div>
          <div className="relative p-6 flex-auto">
            {/* 프로필 수정란 */}
            <div className="w-full flex justify-between mb-2">
              <div className="font-bold ml-2">사진</div>
              <div className="justify-between">
                <img
                  className="object-fill h-28 w-28 mb-2"
                  src={img || ""}
                  alt=""
                />
                <button className="text-sm  px-1 py-1 leading-none border border-black text-black hover:bg-gray-100 mt-4 lg:mt-0">
                  <label htmlFor="changeimg">파일선택</label>
                </button>
                <input
                  hidden
                  id="changeimg"
                  type="file"
                  placeholder="파일선택"
                  ref={imgRef}
                  onChange={changeImgFile}
                />
              </div>
              <div></div>
              <div></div>
            </div>
            <div className="flex justify-center items-center m-3">
              <div className="border-b-2 border-solid border-gray-200 w-full" />
            </div>
            {/* 닉네임 변경 */}
            <div className="flex justify-between items-center m-4">
              <div className="font-bold">닉네임</div>
              <input
                className="appearance-none border border-gray-400 w-3/4 py-2 px-1 text-gray-500 text-center placeholder:text-center"
                onChange={editNameHandler}
                ref={nameRef}
                value={nickname}
              />
            </div>
            <div className="flex justify-center items-center m-3">
              <div className="border-b-2 border-solid border-gray-200 w-full" />
            </div>
            {/* 전체 수정 버튼 완료/취소버튼 */}
            <div className="flex justify-center items-center mb-2 mt-5">
              <button
                className="w-full text-white bg-black font-bold m-2 text-sm px-6 py-3 outline-none focus:outline-none"
                onClick={profileEdit}
              >
                완료하기
              </button>
              <button
                className="w-full text-gray-500 bg-white border border-gray-600 font-bold m-2 text-sm px-6 py-3 outline-none focus:outline-none"
                onClick={cancleBtn}
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
