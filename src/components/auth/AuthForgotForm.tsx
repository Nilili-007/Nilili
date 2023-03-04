import { getAuth, sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface AuthForgotProps {
  email: string;
}

const AuthForgotForm = () => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const auth = getAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm<AuthForgotProps>({ mode: "onBlur" });

  const sendEmailBtn = async (e: React.FormEvent) => {
    if (error !== "") setError("");

    setSending(true);

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "이메일에 링크를 전송했습니다",
          text: "전송된 링크를 클릭해 비밀번호를 재설정해주세요.",
          showConfirmButton: false,
          timer: 1500,
        });
        setSent(true);
        setSending(false);
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "이메일 전송에 실패했습니다",
          text: "다시 시도해주세요.",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-t ">
        <h3 className="text-2xl font-bold">비밀번호 찾기</h3>
      </div>
      <div className="flex justify-center items-center ">
        <div className="border-b-2 border-solid border-black w-[90%]" />
      </div>
      {sent ? (
        <div className="text-2xl font=semibold">
          이미 이메일이 전송되었습니다
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center p-5 m-6">
            <div className="text-sm font-semibold">
              가입한 아이디(이메일)를 입력해주세요.
            </div>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="px-8 pt-6 pb-8 w-full">
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
                placeholder="아이디(이메일)을 입력해주세요"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendEmailBtn(e);
                  }
                }}
              />
              <div className="text-red-600 text-sm font-semibold mt-2 mb-6">
                {errors?.email?.message}
              </div>
              <div className="flex items-center justify-center">
                <button
                  disabled={sending}
                  className="w-full m-2 text-white bg-black font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mb-1"
                  type="submit"
                  onClick={(e) => sendEmailBtn(e)}
                >
                  이메일 전송
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center p-6 ">
            <button
              className="text-black underline text-xs font-semibold p-1 outline-none focus:outline-none mr-1 mb-1"
              onClick={() => navigate("/login")}
            >
              로그인 창으로 돌아가기
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthForgotForm;
