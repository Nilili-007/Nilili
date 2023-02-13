import { useState } from "react";

const UserCategoryBtn = () => {
  const [category, setCategory] = useState("MY");
  return (
    <div className="flex flex-start">
      <button
        className="border border-black px-8  py-2 mr-3 hover:bg-black hover:text-white "
        onClick={() => setCategory("MY")}
      >
        내 게시글
      </button>
      <button
        className="border border-black px-8  py-2 hover:bg-black hover:text-white "
        onClick={() => setCategory("LK")}
      >
        좋아요 한 게시글
      </button>
    </div>
  );
};

export default UserCategoryBtn;
