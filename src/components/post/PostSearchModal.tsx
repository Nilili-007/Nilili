import React, { Dispatch, SetStateAction, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/modules/temporarySlice";

interface IPlacelist {
  name: string;
}

interface PostProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setPlace: Dispatch<SetStateAction<string>>;
  placeList: IPlacelist[];
  list: any;
}

const PostSearchModal = ({ setModalOpen, setPlace }: PostProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  const onClickSessionData = (e: any, item: any) => {
    const targetItem = {
      name: item.place_name,
      address: item.address_name,
      road: item.road_address_name,
      phone: item.phone,
    };
    dispatch(addCourse(targetItem));
  };

  const sessionList = JSON.parse(`${sessionStorage.getItem("sessionList")}`);

  return (
    <div className="w-[800px] h-auto max-h-[800px] overflow-y-scroll bg-white border border-black p-5 absolute translate-x-[10%] -translate-y-[50%] xs:w-11/12 xs:h-auto xs:h-max-5/6 xs:translate-x-0 xs:-translate-y-64 z-[999]">
      <form onSubmit={(e) => onSubmitSearch(e)} className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여행지를 입력해주세요."
          className="w-11/12 h-8 border border-black p-1.5 xs:w-5/6"
        />
        <button className="bg-gray-200 border border-black px-2 ml-2">
          검색
        </button>
      </form>
      <div>
        {sessionList ? (
          <h4 className="my-3 font-bold text-xl">
            검색결과({sessionList.length})
          </h4>
        ) : (
          ""
        )}

        {sessionList?.map((item: any) => {
          return (
            <>
              <div
                key={item.id}
                onClick={(e) => onClickSessionData(e, item)}
                className="p-3 cursor-pointer bg-white hover:bg-red-100 rounded-xl"
              >
                <h5 className="font-bold text-xl">{item.place_name}</h5>
                <p>{item.address_name}</p>
              </div>
              <div className="border-b border-black my-1" />
            </>
          );
        })}
      </div>
      <div className="relative">
        <AiFillCloseCircle
          onClick={closeModal}
          className="mx-auto mt-3 cursor-pointer text-4xl"
        />
      </div>
    </div>
  );
};

export default PostSearchModal;
