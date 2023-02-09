import { useState } from "react";

// <button
//           onClick={() => setHashtag("5")}
//           className="bg-black text-white px-1 mr-2"
//         ></button>
const RecentList = () => {
  const [hashtag, setHashtag] = useState("1");
  return (
    <div className=" my-10 ">
      <p className=" w-fit text-[55px] font-bold">WHAT'S NEW?</p>
      <p className="pb-5 w-fit text-xl text-[#999999]">
        NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
      </p>
      <li className=" w-[1200px] inline-block ">
        {new Array(4).fill(null).map((_, idx) => (
          <div key={idx}>
            <img
              alt="최신순 이미지"
              src="/assets/course.jpg"
              className="w-[280px] h-[296px] pt-5 border-t-2 border-black"
            />
            <p className="0 ml-1 mt-5 w-[270px] h-[60px] text-2xl overflow-hidden font-black">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className="ml-1 mt-2 w-[270px] h-[30px] font-medium text-gray-400 text-xl mb-3 ">
              작성자 이름
            </p>
          </div>
        ))}
      </li>
    </div>
  );
};

export default RecentList;
