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
      <div className="flex justify-center items-center w-full">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5  border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">비밀번호 찾기</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={closeModal}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                  x
                </span>
              </button>
            </div>
            {sent ? (
              <div className="text-2xl font=semibold">
                이미 이메일이 전송되었습니다
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between p-5 ">
                  <div className=" font=semibold">
                    사용자의 이메일을 입력해주세요
                  </div>
                </div>
                <div className="m-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    disabled={sending}
                    className="m-1 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => sendEmailBtn()}
                  >
                    이메일 전송
                  </button>
                </div>
                <div className="flex items-center justify-center p-6 ">
                  <button
                    className="text-black border-b border-blue-500 font-bold text-xs p-1 hover:text-blue-600 outline-none focus:outline-none mr-1 mb-1"
                    onClick={() => setCategory("LG")}
                  >
                    로그인 창으로 돌아가기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForgot;