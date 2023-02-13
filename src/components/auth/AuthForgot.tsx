import { getAuth, sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";

interface ForgotProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AuthForgot = ({ category, setCategory }: ForgotProps) => {
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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5  border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">비밀번호를 찾기 위해</h3>
            </div>
            {sent ? (
              <div className="text-2xl font=semibold">
                이미 이메일이 전송되었습니다
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
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
                <button
                  className="text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  disabled={sending}
                  onClick={() => sendEmailBtn()}
                >
                  이메일 전송
                </button>
                <button
                  className="text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  onClick={() => setCategory("LG")}
                >
                  로그인 창으로
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForgot;
