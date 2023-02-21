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
      <div className="w-full bg-black shadow mb-7">
        <div className="px-4 mx-auto flex-start lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex-col">
            <div className="text-white text-2xl m-3">My Page</div>
            <div className="items-center justify-center  mb-4  space-y-8 md:flex md:space-x-6 md:space-y-0">
              <img src={userImg} alt="" className="object-fill h-40 w-40" />
              <div className="flex-col">
                <div className="text-white text-2xl mb-7">
                  안녕하세요, <br />
                  {userName}님!
                </div>
                <button
                  onClick={openModal}
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
