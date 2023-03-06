import { getAuth } from "firebase/auth";
import { useState, useRef } from "react";
import ProfileEdit from "./ProfileEdit";

const UserNameEdit = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;
  const userImg: any = user?.photoURL;

  const [profileEditModal, setProfileEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openProfileEditModal = () => {
    setProfileEdit(true);
    document.body.style.overflow = "hidden";
  };

  const modalOutClick = (e: any) => {
    if (modalRef.current === e.target) {
      setProfileEdit(false);
      setUserEdit(false);
    }
  };

  return (
    <>
      {profileEditModal ? (
        <ProfileEdit
          profileEditModal={profileEditModal}
          setProfileEdit={setProfileEdit}
          modalRef={modalRef}
          modalOutClick={modalOutClick}
        />
      ) : (
        <></>
      )}
      <div className="w-full h-360 bg-black shadow mb-7">
        <div className="px-4 mx-auto flex-start lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex-col">
            <div className="text-white text-[32px] m-3">My Page</div>
            <div className="items-center justify-center  mb-7  space-y-8 md:flex md:space-x-6 md:space-y-0">
              <img
                src={userImg}
                alt=""
                className="object-fill w-[180px] h-[180px]"
              />
              <div className="flex-col">
                <div className="text-white text-[45px] mb-5">
                  안녕하세요, <br />
                  {userName}님!
                </div>
                <button
                  onClick={openProfileEditModal}
                  className="text-sm leading-none border-none underline text-gray-300 hover:text-teal-500 mt-4 lg:mt-0"
                >
                  프로필 수정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNameEdit;
