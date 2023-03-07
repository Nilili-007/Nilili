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
            <div className="font-eng sm:eng-title1 en-title3 text-white text-[32px] my-8">
              My Page
            </div>
            <div className="items-center justify-center mb-7 flex space-x-6 space-y-0">
              <img
                src={userImg}
                alt=""
                className="object-fill sm:w-[180px] sm:h-[180px] h-[100px] w-[100px]"
              />
              <div className="flex-col">
                <div className="text-white sm:title1 title3 mb-[5%] ">
                  안녕하세요,
                </div>
                <div className="text-white sm:display4 title1 mb-[15%] ">
                  {userName}님!
                </div>
                <button
                  onClick={openModal}
                  className="sm:body1 body3 leading-none border-none  text-gray-300 hover:text-amber-300"
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
