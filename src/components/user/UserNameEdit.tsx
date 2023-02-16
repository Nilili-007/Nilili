import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../utils/firebase";
import ProfileEdit from "./ProfileEdit";

const UserNameEdit = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const nameEdit = () => {
    setToggle(true);
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;
  const userImg: any = user?.photoURL;

  const [nickname, setNickName] = useState<any>(userName);

  const editNameBtn = () => {
    updateProfile(authService.currentUser as any, {
      displayName: nickname,
    })
      .then(() => {
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
        alert("닉네임 변경했습니다");
        setToggle(false);
        navigate("/user/:id");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const editNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {modal ? <ProfileEdit modal={modal} setModal={setModal} /> : <></>}
      <div>
        <button onClick={openModal}>modal open</button>
      </div>
      {toggle ? (
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <input
              className="shadow appearance-none border rounded m-3 py-2 px-1 text-black mb-6"
              onChange={editNameHandler}
              value={nickname}
            />
            <button
              onClick={editNameBtn}
              className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
            >
              프로필 수정정
            </button>
          </div>
        </div>
      ) : (
        <div className="justify-between px-4 mt-4 mb-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <img
              src={userImg}
              alt=""
              className="object-fill h-10 w-10 rounded-full"
            />
            <div className="font-3xl m-5 text-black font-bold">
              {userName}님!
            </div>
            <button
              onClick={nameEdit}
              className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
            >
              프로필 수정
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNameEdit;
