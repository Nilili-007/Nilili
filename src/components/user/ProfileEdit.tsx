import { getAuth, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { authService, storage } from "../../utils/firebase";

interface ProfileEditModal {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface ProfileItem {
//   nickname: any;
//   image: any;
// }

const ProfileEdit = ({ modal, setModal }: ProfileEditModal) => {
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

  //   const initialProfile = {
  //     nickname: userName,
  //     image: userImg,
  //   };

  //const [profile, setProfile] = useState<ProfileItem>(initialProfile);
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
        localStorage.setItem("imgURL", changeImg as any);
        setImg(changeImg as any);
      };
    }
  };

  const profileEdit = async () => {
    const imgRef = ref(storage, `${authService.currentUser?.uid}${Date.now()}`);

    const imgDataUrl = localStorage.getItem("imgURL");
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
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
        localStorage.removeItem("imgURL");
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
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full h-full max-w-md md:h-auto">
        {/* modal contents */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
            <img
              className="object-fill h-20 w-20 rounded-full"
              src={img}
              alt=""
            />
            <button>
              <label htmlFor="changeimg">이미지 선택</label>
            </button>
            <input
              hidden
              id="changeimg"
              type="file"
              placeholder="파일선택"
              ref={imgRef}
              onChange={changeImgFile}
            />
            {/* 닉네임 변경 */}
            <input onChange={editNameHandler} ref={nameRef} value={nickname} />
            {/* 전체 수정 버튼 완료/취소버튼 */}
            <button onClick={profileEdit}>적용</button>
            <button onClick={cancleBtn}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
