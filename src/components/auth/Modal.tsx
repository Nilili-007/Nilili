import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { authService } from "../../utils/firebase";
import Login from "./Login";
import Register from "./Register";
import AuthForgot from "./AuthForgot";

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  pw?: string;
  setPW?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  modalOutClick: (e: any) => void;
  modalRef: React.ForwardedRef<HTMLDivElement>;
}

// email, pw, userName 유효성 검사 정규 표현식
export const emailRegex =
  /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const pwRegex = /^[A-Za-z0-9]{8,15}$/;
export const userNameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

const Modal = ({ modal, setModal, modalOutClick, modalRef }: ModalProps) => {
  const [error, setError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [pwerror, setPWError] = useState("");
  const [pwcheckerror, setPWCheckError] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [userName, setUserName] = useState("");

  const [pwCheck, setPWCheck] = useState("");
  const [isValidLogin, setIsValidLogin] = useState(false);

  const [category, setCategory] = useState("LG");

  const correctEmail = email.match(emailRegex);
  const correctPW = pw.match(pwRegex);
  const correctUsername = userName.match(userNameRegex);

  const closeModal = () => {
    if (modal) {
      setModal(false);
      document.body.style.overflow = "unset";
    }
  };

  // login 유효성 검사
  // const loginvalidationCheck = () => {
  //   if (!email && !pw) {
  //     setError("이메일과 비밀번호를 입력해주세요");
  //     return;
  //   }
  //   if (!email && correctPW) {
  //     setError("");
  //     setEmailError("이메일을 입력해주세요");
  //     setPWError("");
  //     return;
  //   }
  //   if (!pw && correctEmail) {
  //     setError("");
  //     setPWError("비밀번호를 입력해주세요");
  //     return;
  //   }
  //   if (correctEmail === null) {
  //     setError("");
  //     setEmailError("이메일 형식이 아닙니다");
  //     return;
  //   }
  //   if (correctPW === null) {
  //     setError("");
  //     setEmailError("");
  //     setPWError("비밀번호 형식이 아닙니다");
  //     return;
  //   } else {
  //     setError("");
  //     setEmailError("");
  //     setPWError("");
  //     setIsValidLogin(true);
  //     return;
  //   }
  // };

  // register 유효성 검사
  // const registerValidationCheck = () => {
  //   loginvalidationCheck();
  //   if (!userNameRegex.test(userName)) {
  //     setNameError(
  //       "닉네임은 2~8자로 영어 또는 숫자 또는 한글이 조합되어야 합니다."
  //     );
  //     return;
  //   } else if (!pwRegex.test(pw)) {
  //     setPWError(
  //       "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~15자로 입력해주세요."
  //     );
  //     return;
  //   } else if (!userName) {
  //     setNameError("닉네임을 입력해주세요");
  //     setError("");
  //   } else if (!pwCheck && !pwRegex.test(pw)) {
  //     setPWCheckError("비밀번호를 다시 한번 입력해주세요.");
  //     return;
  //   } else if (pw !== pwCheck) {
  //     setPWCheckError("비밀번호가 맞지 않습니다. 다시 입력해주세요");
  //     return;
  //   } else {
  //     setError("");
  //     setEmailError("");
  //     setPWError("");
  //     setPWCheckError("");
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   if (pwCheck) {
  //     registerValidationCheck();
  //   } else {
  //     loginvalidationCheck();
  //   }
  // }, [email, pw, pwCheck, userName]);

  const loginBtn = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (category === "LG") {
      if (!isValidLogin) {
        return;
      }

      // email로 로그인 하기
      signInWithEmailAndPassword(authService, email, pw)
        .then(() => {
          alert("로그인 성공");
          setModal(false);
          document.body.style.overflow = "unset";
          localStorage.setItem("User", JSON.stringify(authService.currentUser));
        })
        .catch((error) => {
          console.log("error: ", error);
          setError("아이디와 비밀번호를 확인해주세요.");
        });
    }

    if (category !== "LG") {
      setCategory("LG");
      setPW("");
      setEmail("");
      setPWCheck("");
      setError("");
    }
  };

  const registerBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (category === "SU") {
      setPW("");
      setEmail("");
      setPWCheck("");
      setError("");
    }
    if (category !== "SU") {
      setCategory("SU");
      setPW("");
      setEmail("");
      setPWCheck("");
      setError("");
    }
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={(e) => modalOutClick(e)}
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto h-3/4 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {category === "LG" ? (
              <>
                <Login
                  email={email}
                  pw={pw}
                  setEmail={setEmail}
                  setPW={setPW}
                  closeModal={closeModal}
                  error={error}
                  emailerror={emailerror}
                  pwerror={pwerror}
                  loginBtn={loginBtn}
                  setModal={setModal}
                />
                <div className="flex items-center justify-center p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <div className="flex items-center justify-center text-gray-500 text-xs mr-5">
                    비밀번호를 잊어버리셨나요?
                  </div>
                  <button
                    className="text-black border-b border-blue-500 font-bold text-xs p-1 hover:text-blue-600 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setCategory("FG")}
                  >
                    비밀번호 찾기
                  </button>
                </div>
                <div className="flex items-center justify-center p-2 rounded-b">
                  <div className="flex items-center justify-center text-gray-500 text-xs mr-5">
                    아직 회원이 아니신가요?
                  </div>
                  <button
                    className="text-black border-b border-blue-500 font-bold text-xs p-1 hover:text-blue-600 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={registerBtn}
                  >
                    회원가입
                  </button>
                </div>
              </>
            ) : category === "SU" ? (
              <>
                <Register closeModal={closeModal} setModal={setModal} />
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <div className="flex items-center justify-center text-gray-500 text-xs mr-5">
                    이미 회원이라면?
                  </div>
                  <button
                    className="text-black border-b border-blue-500 font-bold text-xs p-1 hover:text-blue-600 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={loginBtn}
                  >
                    로그인
                  </button>
                </div>
              </>
            ) : (
              <AuthForgot
                setCategory={setCategory}
                category={category}
                setModal={setModal}
                closeModal={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
