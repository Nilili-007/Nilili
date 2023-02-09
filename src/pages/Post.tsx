import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../components/post/Modal";
import Plan from "../components/post/Plan";
import Desc from "../components/course/Desc";

interface IinitialList {
  name: string;
}

const Post = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetPlace, setTargetPlace] = useState("");
  const initialList: IinitialList[] = [
    { name: "PKM갤러리" },
    { name: "페로탕" },
    { name: "국제갤러리" },
    { name: "학고재" },
  ];
  const [placeList, setPlaceList] = useState(initialList);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <header className="p-5 border-b bg-gray-200">임시 헤더</header>
      <div className="w-11/12 mx-auto mt-10">
        <div className="">
          <div className="py-3">
            <span className="mr-3 font-bold">카테고리</span>
            제목
          </div>
          <div className="border-b border-black -mt-1" />
          <div>
            <div className="flex">
              <div className="w-full h-96 border border-black mt-5 flex justify-center items-center">
                지도
              </div>
            </div>
            <div className="flex justify-end my-5">
              <AiFillPlusCircle
                className="text-4xl cursor-pointer"
                onClick={showModal}
              />
            </div>
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
            <Plan
              setTargetPlace={setTargetPlace}
              placeList={placeList}
              setPlaceList={setPlaceList}
            />
            <div className="flex mt-5">
              <div className="w-1/2 h-96 border border-black mr-4 flex justify-center items-center">
                사진
              </div>
              {/* <textarea
                placeholder="여행지를 소개해주세요."
                className="w-1/2 h-96 justify-end border border-black ml-2 p-3"
              /> */}
              <Desc targetPlace={targetPlace} placeList={placeList} />
            </div>
            {/* <button className="bg-gray-200 border border-black px-2 mt-3 float-right">
              등록
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
