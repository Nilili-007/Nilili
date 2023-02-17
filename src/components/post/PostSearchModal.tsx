import React, { Dispatch, SetStateAction, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/modules/temporarySlice";

interface PostProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchList: object[];
  setSearchList: Dispatch<SetStateAction<any>>;
  searchCnt: any;
}

const PostSearchModal = ({
  setModalOpen,
  setSearchKeyword,
  searchList,
  setSearchList,
  searchCnt,
}: PostProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const closeModal = () => {
    setModalOpen(false);
    setSearchList([]);
  };

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    setSearchKeyword(text);
    setText("");
  };

  const onClickAddCourse = (e: any, item: any) => {
    const targetItem = {
      name: item.place_name,
      address: item.address_name,
      road: item.road_address_name,
      phone: item.phone,
      id: item.id,
      position: {
        lng: item.x,
        lat: item.y,
      },
      memo: "",
    };
    dispatch(addCourse(targetItem));
  };

  return (
    <div className="w-[800px] pb-5 bg-white border border-black absolute translate-x-[10%] -translate-y-[20%] xs:w-11/12 xs:h-auto xs:h-max-5/6 xs:translate-x-0 xs:-translate-y-64 z-[999]">
      <div className="px-8 py-4">
        <div className="flex items-center border-b border-gray-600 mb-5 pb-3">
          <h3 className="text-2xl font-bold ">여행지 찾기</h3>
          <GrFormClose
            onClick={closeModal}
            className="cursor-pointer text-4xl ml-auto"
          />
        </div>
        <form onSubmit={(e) => onSubmitSearch(e)} className="flex">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여행지를 입력해주세요."
            className="w-[85%] h-11 p-1.5 text-lg xs:w-5/6"
          />
          <button className="bg-black text-white shadow-lg px-9 ml-2">
            검색
          </button>
        </form>
      </div>
      <div className="overflow-y-scroll max-h-[1000px]">
        {searchList.length > 0 ? (
          <h4 className="my-3 font-bold text-xl px-8 ">
            검색결과({searchCnt})
          </h4>
        ) : (
          ""
        )}

        {searchList?.map((item: any) => {
          return (
            <>
              <div
                key={item.id}
                onClick={(e) => onClickAddCourse(e, item)}
                className="pt-3 cursor-pointer hover:border-white hover:bg-black hover:text-white"
              >
                <h5 className="font-bold text-2xl px-8 ">{item.place_name}</h5>
                <p className="px-8  mt-2 text-xl">{item.address_name}</p>
                <div className="w-[92%] flex mx-auto mt-3 border-b border-black" />
              </div>
              <div className="" />
            </>
          );
        })}
      </div>
      <div
        id="pagination"
        className="text-2xl font-bold tracking-[20px] flex justify-center items-center mt-5"
      />
    </div>
  );
};

export default PostSearchModal;
