import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../utils/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import * as amplitude from "@amplitude/analytics-browser";
import { setAmplitudeUserId } from "../../utils/amplitude";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm<LoginFormProps>({ mode: "onBlur" });

  const loginBtn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error !== "") setError("");

    setIsLogin(true);
    await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        setAmplitudeUserId(authService.currentUser?.uid);
        amplitude.track("회원 로그인");
        document.body.style.overflow = "unset";
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
      <div className="flex justify-between items-center p-5 rounded-t ">
        <div></div>
        <h3 className="text-2xl font-bold">로그인</h3>
      </div>
      <div className="flex justify-center items-center ">
        <div className="border-b-2 border-solid border-black w-[90%]" />
      </div>
      <div className="relative p-6 flex-auto">
        <form className="px-8 pt-6 pb-8 w-full">
          <div className="text-red-600 text-sm font-semibold mb-6">{error}</div>
          <input
            className="appearance-none border border-gray-400 w-full py-2 px-1 text-black placeholder:text-sm"
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
            placeholder="이메일을 입력해주세요"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginBtn(e);
              }
            }}
          />
          <div className="text-red-600 text-sm font-semibold mt-2 mb-6">
            {errors?.email?.message}
          </div>
          <input
            className="appearance-none border border-gray-400 w-full py-2 px-1 text-black placeholder:text-sm"
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
            placeholder="비밀번호를 입력해주세요"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginBtn(e);
              }
            }}
          />
          <div className="text-red-600 text-sm font-semibold mt-2 mb-6">
            {errors?.password?.message}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="w-full text-white bg-black font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none"
              type="submit"
              disabled={isLogin}
              onClick={(e) => loginBtn(e)}
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
      <SocialLogin />
      <div className="flex justify-center items-center ">
        <div className="border-b border-solid border-gray-500 w-[90%]" />
      </div>
      <div className="flex items-center justify-center p-2 ">
        <div className="flex items-center justify-center text-gray-500 text-xs mr-1">
          비밀번호를 잊어버리셨나요?
        </div>
        <button
          className="text-black underline text-xs font-semibold p-1 outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={() => navigate("/authforgot")}
        >
          비밀번호 찾기
        </button>
      </div>
      <div className="flex items-center justify-center p-2 ">
        <div className="flex items-center justify-center text-gray-500 text-xs mr-1">
          아직 회원이 아니신가요?
        </div>
        <button
          className="text-black underline text-xs font-semibold p-1 outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={() => navigate("/register")}
        >
          회원가입
        </button>
      </div>
    </>
  );
};

export default LoginForm;
