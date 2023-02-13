import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../utils/firebase";
import Modal from "../auth/Modal";
import Weather from "./Weather";

const Header = () => {
  // 반응형 header
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();
  const [isSign, setIsSign] = useState<any>(null);

  // login modal toggle
  const [modal, setModal] = useState(false);

  // modal 띄우기
  const openModal = () => {
    setModal(true);
  };

  const logoutBtn = () => {
    signOut(authService)
      .then(() => {
        alert("로그아웃");
        navigate("/");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.email?.split("@")[0];

  // 새로고침했을 때 user가 있는지 없는지 판단하기
  setTimeout(() => {
    if (authService.currentUser) {
      setIsSign(true);
    } else {
      setIsSign(false);
    }
  }, 1000);

  return (
    <>
      {modal ? <Modal modal={modal} setModal={setModal} /> : <></>}
      <nav className="w-full bg-black shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <button onClick={() => navigate("/")}>
                <h2 className="text-2xl text-white font-bold">Nilili</h2>
              </button>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-sm px-4 py-2 leading-none  text-white">
                  <Weather />
                </li>
                {isSign !== null ? (
                  isSign ? (
                    <>
                      <li className="text-sm px-4 py-2 leading-none  text-white">
                        <button
                          className="font-bold underline hover:text-teal-500"
                          onClick={() => navigate("/user/:id")}
                        >
                          {userName}
                        </button>
                        님 오늘은 어디로 떠나볼까요?
                      </li>
                      <li className="text-sm px-4 py-2 leading-none  text-white hover:text-teal-500">
                        <button onClick={() => navigate("/post")}>
                          글쓰기
                        </button>
                      </li>
                      <li className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                        <button onClick={logoutBtn}>로그아웃</button>
                      </li>
                    </>
                  ) : (
                    <li className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                      <button onClick={openModal}>로그인/회원가입</button>
                    </li>
                  )
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
