import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../utils/firebase";
import Weather from "./Weather";
import { useDispatch } from "react-redux";
import { replaceAllData } from "../../redux/modules/courseSlice";
import Swal from "sweetalert2";
import { resetAmplitude } from "../../utils/amplitude";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const dispatch = useDispatch();

  // 반응형 header
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();
  const [isSign, setIsSign] = useState<boolean | null>(null);

  const userID = authService.currentUser?.uid;

  const logoutBtn = () => {
    signOut(authService)
      .then(() => {
        navigate("/");
        resetAmplitude();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  // 글쓰기 페이지 & 수정 페이지 이탈시 확인 모달
  const leavePresentPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    const text: string = eventTarget.innerText;
    if (
      window.location.pathname === "/post" ||
      window.location.pathname === `/edit/${window.location.pathname.slice(6)}`
    ) {
      Swal.fire({
        title: '<p style="font-size: 18px;">이 페이지를 나가시겠습니까?</p>',
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#B3261E",
        cancelButtonColor: "#50AA72",
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          if (text === "Nilili") {
            navigate(`/`);
            dispatch(replaceAllData([]));
          }
          if (text === userName) {
            navigate(`/user/${userID}`);
            dispatch(replaceAllData([]));
          }
          if (text === "검색하기") {
            navigate("/search");
            dispatch(replaceAllData([]));
          }
          if (text === "글쓰기") {
            navigate("/post");
            dispatch(replaceAllData([]));
          }
          if (text === "로그아웃") {
            logoutBtn();
            dispatch(replaceAllData([]));
          }
        }
      });
    } else {
      if (text === "Nilili") {
        navigate(`/`);
        dispatch(replaceAllData([]));
      }
      if (text === userName) {
        navigate(`/user/${userID}`);
        dispatch(replaceAllData([]));
      }
      if (text === "검색하기") {
        navigate("/search");
        dispatch(replaceAllData([]));
      }
      if (text === "글쓰기") {
        navigate("/post");
        dispatch(replaceAllData([]));
      }
      if (text === "로그아웃") {
        logoutBtn();
        dispatch(replaceAllData([]));
      }
    }
    setNavbar(false);
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;

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
      <nav className="w-full bg-black shadow">
        <div className="justify-between mx-auto lg:max-w-6xl lg:items-center lg:flex w-[90%]">
          <div>
            <div className="flex items-center justify-between py-3 lg:block">
              <button onClick={leavePresentPage}>
                <h2 className="text-4xl leading-[26px] text-white font-bold">
                  Nilili
                </h2>
              </button>

              <div className="lg:hidden">
                <button
                  className="p-2 text-white rounded-md outline-none focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <AiOutlineClose size={22} />
                  ) : (
                    <GiHamburgerMenu size={22} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                {isSign !== null ? (
                  isSign ? (
                    <>
                      <li className="badge1 px-4 py-2 leading-none  text-white">
                        <button
                          className="font-bold underline hover:text-amber-300"
                          onClick={leavePresentPage}
                        >
                          {userName}
                        </button>
                        님 오늘은 어디로 떠나볼까요?
                      </li>
                      <li className="badge1 px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button onClick={leavePresentPage}>검색하기</button>
                      </li>
                      <li className=" badge1  px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button onClick={leavePresentPage}>글쓰기</button>
                      </li>
                      <li className="badge1 px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button onClick={leavePresentPage}>로그아웃</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="badge1 px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button onClick={leavePresentPage}>검색하기</button>
                      </li>
                      <li className="badge1 px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button
                          onClick={() => {
                            navigate("/login");
                            setNavbar(false);
                          }}
                        >
                          로그인
                        </button>
                      </li>
                      <li className="badge1 px-4 py-2 leading-none  text-white hover:text-amber-300">
                        <button
                          onClick={() => {
                            navigate("/register");
                            setNavbar(false);
                          }}
                        >
                          회원가입
                        </button>
                      </li>
                    </>
                  )
                ) : null}
                <li className="text-sm px-4 py-2 leading-none  text-white">
                  <Weather />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
