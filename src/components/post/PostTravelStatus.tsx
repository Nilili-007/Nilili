import React from "react";

const PostTravelStatus = () => {
  return (
    <div className="ml-auto">
      <div className="flex ">
        <button className="border border-gray-600 h-8 px-2 focus:bg-black focus:text-white">
          여행 전
        </button>
        <div className="border-r border-gray-600 h-8 mx-3" />
        <button className="border border-gray-600 h-8 px-2 focus:bg-black focus:text-white">
          여행 후
        </button>
      </div>
    </div>
  );
};

export default PostTravelStatus;
