import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../components/post/Modal";
import Desc from "../components/course/Desc";

const Post = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState("");
  const placelist = [
    { name: "#1 PKM갤러리", order: 0 },
    { name: "#2 페로탕", order: 1 },
    { name: "#3 국제갤러리", order: 2 },
    { name: "#4 학고재", order: 3 },
  ];

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickCircle = (e: any, key: number) => {
    setTarget(placelist[key].name);
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
              <div className="w-full h-96 border border-black mt-5">지도</div>
            </div>
            <div className="flex justify-end my-5">
              <FiPlusCircle
                className="text-4xl cursor-pointer"
                onClick={showModal}
              />
            </div>
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
            <div className="border-t border-black mt-10" />
            <div className="flex justify-between mt-5">
              {placelist.map((item, key) => {
                return (
                  <div className="-mt-7">
                    <div
                      onClick={(e) => onClickCircle(e, key)}
                      key={key}
                      className="w-4 h-4 rounded-full bg-black cursor-pointer hover:bg-gray-400"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              {placelist.map((item: any) => {
                return (
                  <h5 key={item.order} className="font-bold text-2xl">
                    {item.name}
                  </h5>
                );
              })}
            </div>
            <div className="flex mt-5">
              <div className="w-1/2 h-96 border border-black mr-4">사진</div>
              {/* <textarea
                placeholder="여행지를 소개해주세요."
                className="w-1/2 h-96 justify-end border border-black ml-2 p-3"
              /> */}
              <Desc target={target} placelist={placelist} />
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
