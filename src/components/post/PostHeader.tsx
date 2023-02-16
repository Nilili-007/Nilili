import React from "react";

// 커버 추가/제거 : 유저가 직접 업로드, 기본 이미지 중 선택
// 그라데이션 효과

const PostHeader = () => {
  return (
    <div className="h-64 bg-gray-100">
      <div className="w-[70%] pt-24 m-auto">
        <h1 className="text-5xl font-bold">DRAW MY PATH</h1>
        <p className="mt-4">유저님만의 여정을 직접 그려보세요!</p>
        <button className="bg-black text-white px-2 py-1 mt-2">
          Add Cover
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
