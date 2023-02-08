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
    <Container>
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
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  width: 800px;
  height: auto;
  max-height: 800px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  position: absolute;
  top: 10%;
  left: 20%;
  transform: translate(15%, -5%);
`;
