import { useState } from "react";
import Register from "./Register";

interface Toggle {
  setLoginBtn: any;
}

const Login = ({ setLoginBtn }: Toggle) => {
  // 회원 가입과 toggle 하기
  const [toggle, setToggle] = useState(false);

  const registerToggle = () => {
    setToggle(true);
  };

  return (
    <>
      {toggle ? (
        <Register setToggle={setToggle} setLoginBtn={setLoginBtn} />
      ) : (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-2xl font=semibold">로그인</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setLoginBtn(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className=" rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-3">
                    E-mail
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
                  <label className="block text-black text-sm font-bold mb-3">
                    비밀번호
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
                  <div className="flex items-center justify-center">
                    <button
                      className="m-2 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setLoginBtn(false)}
                    >
                      로그인
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className="flex-column items-center">
                  <div>
                    <button>
                      <img className="w-80" src="./login/google.png" alt="" />
                    </button>
                  </div>
                  <div>
                    <button>
                      <img className="w-80" src="./login/kakao.png" alt="" />
                    </button>
                  </div>
                  <div>
                    <button>
                      <img className="w-80" src="./login/naver.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className="flex items-center justify-center text-gray-500 text-sm font-bold mr-5">
                  아직 회원이 아니라면?
                </div>
                <button
                  className="text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={registerToggle}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
