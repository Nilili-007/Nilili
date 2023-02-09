import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { AiFillCloseCircle } from "react-icons/ai";

interface PostProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setModalOpen }: PostProps) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-[800px] h-auto max-h-[800px] overflow-y-scroll bg-white border border-black p-5 absolute translate-x-[70%] -translate-y-[135%] ">
      <div className="flex">
        <input
          placeholder="여행지를 입력해주세요."
          className="w-11/12 h-8 border border-black p-1.5"
        />
        <button className="bg-gray-200 border border-black px-2 ml-2">
          검색
        </button>
      </div>
      <div>
        <h4 className="my-3 font-bold text-xl">검색결과(3)</h4>
        <div
          onClick={closeModal}
          className="p-3 cursor-pointer bg-white hover:bg-red-100 rounded-xl"
        >
          <h5>장소명</h5>
          <p>주소</p>
        </div>
        <div className="border-b border-black my-1" />
        <div
          onClick={closeModal}
          className="p-3 cursor-pointer bg-white hover:bg-red-100 rounded-xl"
        >
          <h5>장소명</h5>
          <p>주소</p>
        </div>
        <div className="border-b border-black my-1" />
        <div
          onClick={closeModal}
          className="p-3 cursor-pointer bg-white hover:bg-red-100 rounded-xl"
        >
          <h5>장소명</h5>
          <p>주소</p>
        </div>
      </div>
      <div className="relative">
        <AiFillCloseCircle
          onClick={closeModal}
          className="mx-auto mt-1 cursor-pointer text-4xl"
        />
      </div>
    </div>
  );
};

export default Modal;
