import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authService } from "../../utils/firebase";

interface UserEditModal {
  userEdit: boolean;
  setUserEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalOutClick: (e: any) => void;
  modalRef: React.ForwardedRef<HTMLDivElement>;
}

const UserInfoEdit = ({
  userEdit,
  setUserEdit,
  modalOutClick,
  modalRef,
}: UserEditModal) => {
  const closeModal = () => {
    if (userEdit) {
      setUserEdit(false);
      document.body.style.overflow = "unset";
    }
  };

  const auth = getAuth();
  const user: any = auth.currentUser;
  const userEmail = auth.currentUser?.email;
  const navigate = useNavigate();
  const userID = authService.currentUser?.uid;

  const [newEmail, setNewEmail] = useState<any>(userEmail);
  const [newPassword, setNewPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const editEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const changeEmailBtn = () => {
    updateEmail(user, newEmail)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "이메일을 변경했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(newEmail);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const editPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  // 비밀번호 변경
  const changePasswordBtn = () => {
    updatePassword(user, newPassword)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "비밀번호를 수정했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(newPassword);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      onClick={(e) => modalOutClick(e)}
      ref={modalRef}
    >
      {" "}
      <div className="relative w-full h-3/4 border border-gray-200 max-w-md md:h-auto">
        {/* modal contents */}
        <div className="border relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex justify-between items-center p-5 rounded-t ">
            <div></div>
            <h3 className="text-2xl font-bold">이메일/비밀번호 변경</h3>
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
            {/* 개인정보 수정란 */}
            <div className="flex justify-between items-center m-4">
              <input
                className="appearance-none border border-gray-400 w-full py-2 px-1 text-gray-500 text-center placeholder:text-center"
                onChange={editEmailHandler}
                ref={emailRef}
                value={newEmail}
              />
              <button
                className="w-[50%] text-white bg-black font-bold m-2 text-xs px-6 py-3 outline-none focus:outline-none"
                onClick={changeEmailBtn}
              >
                이메일 변경
              </button>
            </div>

            <div className="flex justify-between items-center m-4">
              <input
                className="appearance-none border border-gray-400 w-full py-2 px-1 text-gray-500 text-center placeholder:text-center"
                onChange={editPasswordHandler}
                ref={passwordRef}
                value={newPassword}
                type="password"
              />
              <button
                className="w-[50%] text-white bg-black font-bold m-2 text-xs px-6 py-3 outline-none focus:outline-none"
                onClick={changePasswordBtn}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEdit;
