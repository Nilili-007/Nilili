import {
  deleteUser,
  getAuth,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authService } from "../../utils/firebase";

interface UserEditModal {
  userEdit: boolean;
  setUserEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalOutClick: (e: React.MouseEvent) => void;
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

  // 이메일 변경
  const changeEmailBtn = () => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    // 유효성 검사
    if (!newEmail?.trim()) {
      Swal.fire({
        icon: "warning",
        title: "이메일을 입력해 주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (!emailRegex.test(newEmail)) {
      Swal.fire({
        icon: "warning",
        title: "이메일 형식에 맞지 않습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      setNewEmail("");
      return;
    }
    updateEmail(user, newEmail)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "이메일을 변경했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserEdit(false);
        navigate(`/user/${userID}`);
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
    const pwRegex = /^[A-Za-z0-9]{8,15}$/;

    // 유효성 검사
    if (!newPassword?.trim()) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호를 입력해 주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (!pwRegex.test(newPassword)) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호 형식에 맞지 않습니다",
        text: "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~15자로 입력해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      setNewPassword("");
      return;
    }
    updatePassword(user, newPassword)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "비밀번호를 수정했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserEdit(false);
        navigate(`/user/${userID}`);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const ondeleteUser = () => {
    Swal.fire({
      title: "정말 회원 탈퇴를 진행하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 탈퇴할래요",
      cancelButtonText: "아니요, 취소할래요",
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUser(user)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "회원 탈퇴가 완료되었습니다",
                text: "NILILI를 사용해주셔서 감사했습니다.",
                showConfirmButton: false,
                timer: 1500,
              });
              setUserEdit(false);
              navigate("/");
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        }
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
                className="w-[50%] text-white bg-black font-bold m-2 text-xs py-2 px-1 outline-none focus:outline-none"
                onClick={changeEmailBtn}
              >
                이메일 <br />
                변경
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
                className="w-[50%]  text-white bg-black font-bold m-2 text-xs py-2 px-1 outline-none focus:outline-none"
                onClick={changePasswordBtn}
              >
                비밀번호 <br /> 변경
              </button>
            </div>

            <div className="flex justify-center items-center m-3">
              <div className="border-b-2 border-solid border-gray-200 w-full" />
            </div>

            {/* 회원 탈퇴 버튼 (이메일, 비밀번호 수정하러 들어와서야 회원 탈퇴 가능) */}
            <div className="flex justify-center items-center ">
              <button
                onClick={ondeleteUser}
                className="text-[15px] leading-none border-none underline text-gray-400 hover:text-teal-500 mt-4 lg:mt-0"
              >
                회원 탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEdit;
