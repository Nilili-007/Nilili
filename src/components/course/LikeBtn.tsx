import React, { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const LikeBtn = () => {
  const [like, setlike] = useState(false);
  return (
    <div className="my-4">
      {like === true ? (
        <IoHeartSharp
          className="text-rose-600"
          size={40}
          onClick={() => setlike(false)}
        />
      ) : (
        <IoHeartOutline
          className="text-rose-600"
          size={40}
          onClick={() => setlike(true)}
        />
      )}
    </div>
  );
};

export default LikeBtn;
