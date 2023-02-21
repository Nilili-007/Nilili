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
          <div className="w-full min-w-full border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {category === "LG" ? (
              <Login
                closeModal={closeModal}
                setModal={setModal}
                setCategory={setCategory}
                registerBtn={registerBtn}
              />
            ) : category === "SU" ? (
              <Register
                closeModal={closeModal}
                setModal={setModal}
                loginBtn={loginBtn}
              />
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
