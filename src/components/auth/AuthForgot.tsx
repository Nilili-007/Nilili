import { getAuth, sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";

interface ForgotProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  closeModal: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForgot = ({
  category,
  setCategory,
  closeModal,
  setModal,
}: ForgotProps) => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const auth = getAuth();

  const sendEmailBtn = async () => {
    if (error !== "") setError("");

    setSending(true);

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("이메일에 링크를 보냈습니다");
        setSent(true);
        setSending(false);
        setModal(false);
      })
      .catch((error) => {
        alert("이메일 보내기 실패");
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-t ">
        <div> </div>
        <h3 className="text-2xl font-bold">비밀번호 찾기</h3>
        <button
          className="bg-transparent border-0 text-gray-400 font-extrabold text-xl"
          onClick={closeModal}
        >
          X
        </button>
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
          <div className="m-2">
            <input
              className="appearance-none border border-gray-400 w-full py-2 px-1 text-black placeholder:text-sm"
              type="email"
              name="email"
              id="email"
              placeholder="아이디(이메일)을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={sending}
              className="w-full m-2 text-white bg-black font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mb-1"
              type="button"
              onClick={() => sendEmailBtn()}
            >
              이메일 전송
            </button>
          </div>
          <div className="flex items-center justify-center p-6 ">
            <button
              className="text-black underline text-xs font-semibold p-1 outline-none focus:outline-none mr-1 mb-1"
              onClick={() => setCategory("LG")}
            >
              로그인 창으로 돌아가기
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthForgot;
