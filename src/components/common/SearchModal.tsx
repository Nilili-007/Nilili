import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../redux/modules/courseSlice";
import Swal from "sweetalert2";

// interface PostProps {
//   setModalOpen: Dispatch<SetStateAction<boolean>>;
//   searchKeyword: any;
//   setSearchKeyword: Dispatch<SetStateAction<string>>;
//   searchList: object[];
//   setSearchList: Dispatch<SetStateAction<any>>;
//   searchCnt: any;
//   boundsInfo: object;
// }

const SearchModal = ({
  setModalOpen,
  searchKeyword,
  setSearchKeyword,
  searchList,
  setSearchList,
  searchCnt,
}: any) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const lists = useSelector((state: any) => state.courseSlice.courseList);

  const closeModal = () => {
    setModalOpen(false);
    setSearchList([]);
    setSearchKeyword("");
  };

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    setSearchKeyword(text);
    setText("");
  };

  const addPlace = (item: any) => {
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

    if (lists.some((course: any) => course.id === targetItem.id)) {
      Swal.fire({
        title: `<p style="font-size: 20px;">이미 등록한 여행지입니다.\n그래도 추가하시겠습니까?</p>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#B3261E",
        cancelButtonColor: "#50AA72",
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addCourse(targetItem));
          setModalOpen(false);
          setSearchList([]);
          setSearchKeyword("");
        }
        if (result.isDismissed) {
          setModalOpen(true);
        }
      });
    } else {
      dispatch(addCourse(targetItem));
      setModalOpen(false);
      setSearchList([]);
      setSearchKeyword("");
    }
  };

  return (
    <div className="w-[900px] pb-5 bg-white border border-gray-04 absolute -translate-x-[20%] -translate-y-[40%] xs:w-11/12 xs:h-auto xs:h-max-5/6 xs:-translate-x-[3.5%] xs:-translate-y-28 z-[999]">
      <div className="px-8 py-4 xs:px-5 xs:py-2">
        <div className="flex items-center border-b border-gray-04 mb-5 pb-3 xs:pb-1">
          <h3 className="text-[24px] font-bold xs:text-lg ">여행지 찾기</h3>
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
            className="w-[695px] h-[50px] px-[14px] py-[16px] border border-gray-400 text-lg focus:outline-none xs:w-[72%] xs:h-10 xs:text-[14px]"
          />
          <button className="w-[121px] bg-black text-white shadow-lg ml-auto xs:text-[14px] xs:w-20">
            검색하기
          </button>
        </form>
      </div>
      <div className="overflow-y-scroll max-h-[1000px]">
        {searchList.length > 0 ? (
          <h4 className="title3 my-3 px-8 xs:text-lg xs:mt-2 xs:mb-1 xs:px-5">
            '{searchKeyword}' 검색결과({searchCnt})
          </h4>
        ) : (
          ""
        )}

        {searchList?.map((item: any) => {
          return (
            <div
              key={item.id}
              onClick={() => addPlace(item)}
              className="pt-3 cursor-pointer hover:border-white hover:bg-black hover:text-white xs:pt-1"
            >
              <h5 className="title3 px-8 xs:px-5 xs:text-[16px]">
                {item.place_name}
              </h5>
              <p className="px-8 mt-2 text-lg text-[#474C51] xs:px-5 xs:text-sm xs:mt-0">
                {item.address_name}
              </p>
              <div className="w-[92%] flex mx-auto mt-3 border-b border-black xs:mt-2" />
            </div>
          );
        })}
      </div>
      <div
        id="pagination"
        className="text-2xl font-bold tracking-[20px] flex justify-center items-center mt-5 xs:text-xl"
      />
    </div>
  );
};

export default SearchModal;
