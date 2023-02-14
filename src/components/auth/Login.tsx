import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../../utils/firebase";

interface LoginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  pw: string;
  setPW: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  emailerror: string;
  pwerror: string;
  loginBtn: any;
  closeModal: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  email,
  setEmail,
  pw,
  setPW,
  error,
  emailerror,
  pwerror,
  closeModal,
  loginBtn,
  setModal,
}: LoginProps) => {
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const pwHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPW(event.target.value);
  };

  // google login
  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        alert("로그인 성공");
        setModal(false);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  // facebook login
  const signInFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        alert("로그인 성공");
        setModal(false);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  // kakao login

  // naver login

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
        <h3 className="text-2xl font=semibold">로그인</h3>
        <button
          className="bg-transparent border-0 text-black float-right"
          onClick={closeModal}
        >
          <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
            x
          </span>
        </button>
      </div>
      <div className="relative p-6 flex-auto">
        <form className=" rounded px-8 pt-6 pb-8 w-full">
          <div className="text-yellow-500 font-bold m-2">{error}</div>
          <label className="block text-black font-2xl font-bold mb-3">
            이메일
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            type="email"
            value={email}
            onChange={emailHandler}
            placeholder="이메일"
          />
          <div className="text-red-600 font-sm mb-6">{emailerror}</div>
          <label className="block text-black font-2xl font-bold mb-3">
            비밀번호
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            type="password"
            value={pw}
            onChange={pwHandler}
            placeholder="비밀번호"
          />
          <div className="text-red-600 font-sm mb-6">{pwerror}</div>
          <div className="flex items-center justify-center">
            <button
              className="m-1 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
              type="button"
              onClick={loginBtn}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
        <div className="flex-column items-center">
          <div>
            <button onClick={signInGoogle}>
              <img className="w-80" src="./login/google.png" alt="" />
            </button>
          </div>
          <div>
            <button onClick={signInFacebook}>
              <img className="w-80" src="./login/facebook.png" alt="" />
            </button>
          </div>
          {/* <div>
            <button>
              <img className="w-80" src="./login/kakao.png" alt="" />
            </button>
          </div>
          <div>
            <button>
              <img className="w-80" src="./login/naver.png" alt="" />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
