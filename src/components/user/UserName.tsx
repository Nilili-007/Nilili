import { getAuth } from "firebase/auth";
import { useState, useRef } from "react";
import ProfileEdit from "./ProfileEdit";
import UserInfoEdit from "./UserInfoEdit";

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

  const openUserEditModal = () => {
    setUserEdit(true);
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
      {userEdit ? (
        <UserInfoEdit
          userEdit={userEdit}
          setUserEdit={setUserEdit}
          modalRef={modalRef}
          modalOutClick={modalOutClick}
        />
      ) : (
        <></>
      )}
      <div className="w-full h-360 bg-black shadow mb-[2%] pb-[3%]">
        <div className=" lg:max-w-6xl w-[90%] mx-auto ">
          <div className="flex gap-[3%] mt-[2%]">
            <div>
              <img
                src={userImg}
                alt="프로필 이미지"
                className="object-fill sm:w-[200px] sm:h-[200px] h-[120px] w-[120px]"
              />
            </div>
            <div>
              <p className="text-white sm:title1 body3  mb-[3%] ">
                안녕하세요,
              </p>

              <p className="text-white sm:display5 title3 mb-[12%] ">
                {userName}님!
              </p>

              <button
                onClick={openProfileEditModal}
                className="sm:body1 badge1  border-none  text-gray-300 hover:text-amber-300 mb-[3%]"
              >
                프로필 수정하기
              </button>

              <div>
                <button
                  onClick={openUserEditModal}
                  className="sm:text-lg text-xs  border-none underline text-gray-300 hover:text-amber-300"
                >
                  이메일/비밀번호 변경하기
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
