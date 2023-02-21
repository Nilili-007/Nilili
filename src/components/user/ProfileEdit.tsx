import { getAuth, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { authService, storage } from "../../utils/firebase";

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
        alert("프로필 수정을 완료했습니다");
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
        <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-2xl font=semibold">프로필 수정</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={closeModal}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                x
              </span>
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
              <button className="text-sm  px-1 py-1 leading-none border rounded text-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0">
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
                className="shadow appearance-none w-3/4 border rounded py-2 px-1 text-black"
                onChange={editNameHandler}
                ref={nameRef}
                value={nickname}
              />
            </div>
            {/* 전체 수정 버튼 완료/취소버튼 */}
            <div className="flex justify-center items-center mt-3">
              <button
                className="text-sm m-2 px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
                onClick={profileEdit}
              >
                완료
              </button>
              <button
                className="text-sm m-2 px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
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
