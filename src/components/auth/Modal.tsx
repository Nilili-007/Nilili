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
const Modal = ({ modal, setModal, modalOutClick, modalRef }: ModalProps) => {
  const [category, setCategory] = useState("LG");

  const closeModal = () => {
    if (modal) {
      setModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const loginBtn = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (category !== "LG") {
      setCategory("LG");
    }
  };

  const registerBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (category !== "SU") {
      setCategory("SU");
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
                <Login closeModal={closeModal} setModal={setModal} />
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
