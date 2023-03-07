import { getAuth } from "firebase/auth";
import { useState, useRef } from "react";
import ProfileEdit from "./ProfileEdit";

const UserNameEdit = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;
  const userImg: any = user?.photoURL;

  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const modalOutClick = (e: any) => {
    if (modalRef.current === e.target) {
      setModal(false);
    }
  };

  return (
    <>
      {modal ? (
        <ProfileEdit
          modal={modal}
          setModal={setModal}
          modalRef={modalRef}
          modalOutClick={modalOutClick}
        />
      ) : (
        <></>
      )}
      <div className="w-full h-360 bg-black shadow mb-7 pb-10">
        <div className="mx-auto flex-start lg:max-w-6xl md:items-center md:flex w-[90%]">
          <div className="flex-col">
            <div className="font-eng eng-title1 text-white text-[32px] my-8">
              My Page
            </div>
            <div className="items-center justify-center  mb-7  space-y-8 md:flex md:space-x-6 md:space-y-0">
              <img
                src={userImg}
                alt=""
                className="object-fill w-[180px] h-[180px]"
              />
              <div className="flex-col">
                <div className="text-white title1 mb-2 ">안녕하세요,</div>
                <div className="text-white display4 mb-10 ">{userName}님!</div>
                <button
                  onClick={openModal}
                  className="body1 leading-none border-none  text-gray-300 hover:text-amber-300 mt-4 lg:mt-0"
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
