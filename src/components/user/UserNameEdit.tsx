import { useState } from "react";

const UserNameEdit = () => {
  const [toggle, setToggle] = useState(false);

  const nameEdit = () => {
    setToggle(true);
  };

  const nameHandler = () => {
    setToggle(false);
  };

  return (
    <>
      {toggle ? (
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <input className="shadow appearance-none border rounded m-3 py-2 px-1 text-black mb-6" />
            <button
              onClick={nameHandler}
              className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
            >
              변경 완료
            </button>
          </div>
        </div>
      ) : (
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <div className="font-3xl m-5 text-black font-bold">007님!</div>
            <button
              onClick={nameEdit}
              className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-blue-200 mt-4 lg:mt-0"
            >
              닉네임 변경하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNameEdit;