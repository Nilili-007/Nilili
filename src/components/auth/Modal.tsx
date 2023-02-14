import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

const Modal = ({ modal, setModal, modalOutClick, modalRef }: ModalProps) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");

  const [pwCheck, setPWCheck] = useState("");
  const [isValidLogin, setIsValidLogin] = useState(false);

  const [category, setCategory] = useState("LG");

  const closeModal = () => {
    if (modal) {
      setModal(false);
      document.body.style.overflow = "unset";
    }
  };

  // login 유효성 검사
  const loginvalidationCheck = () => {
    if (!email && !pw) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    } else if (email.indexOf("@") === -1) {
      setError("이메일 형식이 아닙니다.");
      return;
    } else if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    } else if (!pw) {
      setError("비밀번호를 입력해주세요.");
      return;
    } else if (pw.length < 6) {
      setError("비밀번호 형식이 아닙니다.");
      return;
    } else {
      setError("");
      setIsValidLogin(true);
      return;
    }
  };

  // register 유효성 검사
  const registerValidationCheck = () => {
    loginvalidationCheck();
    if (!pwCheck) {
      setError("비밀번호를 다시 한번 입력해주세요.");
      return;
    } else if (pw !== pwCheck) {
      setError("비밀번호가 맞지 않습니다. 다시 입력해주세요");
      return;
    } else {
      setError("");
      return;
    }
  };

  useEffect(() => {
    if (pwCheck) {
      registerValidationCheck();
    } else {
      loginvalidationCheck();
    }
  }, [email, pw, pwCheck]);

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
      registerValidationCheck();
      createUserWithEmailAndPassword(authService, email, pw)
        .then((userCredential) => {
          alert("회원가입 성공");
          setModal(false);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("이미 사용중인 이메일입니다.");
          }
        });
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
                <Register
                  setEmail={setEmail}
                  pwCheck={pwCheck}
                  setPW={setPW}
                  setPWCheck={setPWCheck}
                  pw={pw}
                  email={email}
                  error={error}
                  registerBtn={registerBtn}
                  closeModal={closeModal}
                />
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
