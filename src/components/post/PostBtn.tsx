import React from "react";

interface IPostBtn {
  submitHandle: (event: any) => void;
}

const PostBtn = ({ submitHandle }: IPostBtn) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={submitHandle}
        className="bg-black text-white px-16 py-2 my-10 flex justify-center"
      >
        게시물 등록하기
      </button>
    </div>
  );
};

export default PostBtn;
