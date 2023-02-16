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
      <div className="justify-between px-4 mt-4 mb-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <img
            src={userImg}
            alt=""
            className="object-fill h-10 w-10 rounded-full"
          />
          <div className="font-3xl m-5 text-black font-bold">{userName}님!</div>
          <button
            onClick={openModal}
            className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
          >
            프로필 수정
          </button>
        </div>
      </div>
    </>
  );
};

export default UserNameEdit;
