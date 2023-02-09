import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import PostTitle from "../components/post/PostTitle";
import PostHashTag from "../components/post/PostHashTag";
import PostBtn from "../components/post/PostBtn";
import PostSearchModal from "../components/post/PostSearchModal";
import CourseDesc from "../components/course/CourseDesc";
import CourseLine from "../components/post/CourseLine";

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
    { name: "국립현대미술관" },
  ];
  const [placeList, setPlaceList] = useState(initialList);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0">
        <PostTitle />
        <div className="w-full h-96 border border-black mt-5 flex justify-center items-center xs:h-48 xs:mt-0">
          지도
        </div>
        <div className="flex justify-end -mt-20 mr-4 xs:-mt-12 xs:mr-2">
          <AiFillPlusCircle
            className="text-6xl cursor-pointer xs:text-4xl"
            onClick={showModal}
          />
        </div>
        {modalOpen && <PostSearchModal setModalOpen={setModalOpen} />}
        <CourseLine
          setTargetPlace={setTargetPlace}
          placeList={placeList}
          setPlaceList={setPlaceList}
        />
        <div className="flex mt-5 mb-10">
          <div className="w-1/2 h-96 border border-black mr-4 flex justify-center items-center xs:hidden">
            사진
          </div>
          <div className="flex flex-col w-1/2 xs:w-full">
            <CourseDesc targetPlace={targetPlace} placeList={placeList} />
            <textarea
              placeholder="여행지를 소개해주세요."
              className="h-60 justify-end border border-black p-3 xs:h-40"
            />
            <button className="bg-gray-200 border border-black px-2 mt-3 float-right">
              등록
            </button>
          </div>
        </div>
        <PostHashTag />
        <PostBtn />
      </div>
    </>
  );
};

export default Post;
