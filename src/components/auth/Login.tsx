import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../utils/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";

interface LoginProps {
  closeModal: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginForm {
  email: string;
  password: string;
}

const Login = ({ closeModal, setModal }: LoginProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const {
    register,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onBlur" });

  const loginBtn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error !== "") setError("");

    setIsLogin(true);
    await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        alert("로그인 성공");
        setModal(false);
        document.body.style.overflow = "unset";
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
      })
      .catch((error) => {
        if (error.code.includes("auth/user-not-found")) {
          setError("회원이 아닙니다. 회원가입을 먼저 진행해주세요");
          return;
        }
        console.log("error: ", error);
        setIsLogin(false);
        setError("아이디와 비밀번호를 확인해주세요.");
      });
  };

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
          <div className="text-red-600 font-bold m-2">{error}</div>
          <label className="block text-black font-2xl font-bold mb-3">
            이메일
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            {...register("email", {
              required: "이메일을 올바르게 입력해주세요.",
              pattern: {
                value:
                  /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                message: "이메일 형식에 맞게 입력해주세요,",
              },
            })}
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginBtn(e);
              }
            }}
          />
          <div className="text-red-600 font-sm mb-6">
            {errors?.email?.message}
          </div>
          <label className="block text-black font-2xl font-bold mb-3">
            비밀번호
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message:
                  "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~15자로 입력해주세요.",
              },
              pattern: {
                value: /^[A-Za-z0-9]{8,15}$/,
                message:
                  "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~15자로 입력해주세요.",
              },
            })}
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginBtn(e);
              }
            }}
          />
          <div className="text-red-600 font-sm mb-6">
            {errors?.password?.message}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="m-1 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
              type="submit"
              disabled={isLogin}
              onClick={(e) => loginBtn(e)}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
      <SocialLogin setModal={setModal} />
    </>
  );
};

export default Login;
