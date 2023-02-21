import { getAuth, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { authService, storage } from "../../utils/firebase";
import Swal from "sweetalert2";

interface ProfileEditModal {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalOutClick: (e: any) => void;
  modalRef: React.ForwardedRef<HTMLDivElement>;
}

const ProfileEdit = ({
  modal,
  setModal,
  modalRef,
  modalOutClick,
}: ProfileEditModal) => {
  const closeModal = () => {
    if (modal) {
      setModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;
  const userImg: any = user?.photoURL;

  const [img, setImg] = useState(userImg);
  const [nickname, setNickname] = useState<any>(userName);

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
        setImg(changeImg as any);
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
        setModal(false);
        navigate("/user/:id");
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
    setModal(false);
  };

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      onClick={(e) => modalOutClick(e)}
      ref={modalRef}
    >
      <div className="relative w-full h-3/4 max-w-md md:h-auto">
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
          <div className="relative p-6 flex-auto">
            {/* 프로필 수정란 */}
            <div className="flex justify-center items-center">
              <img
                className="object-fill h-40 w-40 rounded-full m-2"
                src={img}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center mb-3">
              <button className="text-sm  px-1 py-1 leading-none border rounded text-black hover:border-transparent hover:text-teal-500 mt-4 lg:mt-0">
                <label htmlFor="changeimg">사진 선택</label>
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
            {/* 닉네임 변경 */}
            <div className="flex justify-center items-center m-3">
              <input
                className="appearance-none border border-gray-400 w-3/4 py-2 px-1 text-black placeholder:text-sm"
                onChange={editNameHandler}
                ref={nameRef}
                value={nickname}
              />
            </div>
            {/* 전체 수정 버튼 완료/취소버튼 */}
            <div className="flex justify-center items-center mt-3">
              <button
                className="text-white bg-black font-bold m-2 text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none"
                onClick={profileEdit}
              >
                완료
              </button>
              <button
                className="text-white bg-black font-bold m-2 text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none"
                onClick={cancleBtn}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
