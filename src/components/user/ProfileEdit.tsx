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
  const userID = authService.currentUser?.uid;

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
    setModal(false);
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
            <div className="w-full flex justify-between items-center m-3">
              <div className="font-bold mr-4">사진</div>
              <div>
                <img className="object-fill h-28 w-28 m-1" src={img} alt="" />
                <div className="text-[10px]">
                  회원님을 알릴 수 있는 사진을 등록해주세요. <br />
                  등록된 사진은 회원님의 게시물이나 댓글 등에 사용됩니다.
                </div>
              </div>
              <div className="flex justify-center items-center mb-3">
                <button className="text-sm  px-1 py-1 leading-none border border-black text-black hover:border-transparent hover:text-teal-500 mt-4 lg:mt-0">
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
            </div>
            <div className="flex justify-center items-center m-3">
              <div className="border-b-2 border-solid border-gray-200 w-full" />
            </div>
            {/* 닉네임 변경 */}
            <div className="flex justify-between items-center m-4">
              <div className="font-bold">닉네임</div>
              <input
                className="appearance-none border border-gray-400 w-3/4 py-2 px-1 text-black placeholder:text-sm"
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
