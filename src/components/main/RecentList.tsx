import { useState } from "react";

const RecentList = () => {
  const [hashtag, setHashtag] = useState("1");
  return (
    <div className="  my-10 ">
      <div className="flex items-center">
        <p className="mr-5 font-bold text-2xl mb-2">해시태그별 최신 코스</p>
        <button
          onClick={() => setHashtag("1")}
          className="bg-black text-white px-1 mr-2 "
        >
          전체
        </button>
        <button
          onClick={() => setHashtag("2")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("3")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("4")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("5")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("6")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("7")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("8")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
        <button
          onClick={() => setHashtag("9")}
          className="bg-black text-white px-1 mr-2"
        >
          연인끼리
        </button>
      </div>
      <div className=" w-[1100px] flex flex-wrap justify-between ">
        {new Array(8).fill(null).map((_, idx) => (
          <div className="pt-6 border-t-2 border-black w-[260px]  " key={idx}>
            <img
              alt="최신순 이미지"
              src="/assets/saryangdo.jpg"
              className="w-[260px] h-[230px]"
            />
            <p className="0 mx-auto w-[250px] h-[50px] overflow-hidden  font-bold">
              title 제목이 아주 아주 길어지는 경우에 어떻게 보일까요 근데 제목에
              글자 수 제한을 넣어야 할까요 아니면 몇글자까지 보여주는 제한만
              주는게 좋을까요
            </p>
            <p className=" mx-auto w-[250px] h-[30px] text-gray-500 text-xs ">
              작성자 이름
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;
