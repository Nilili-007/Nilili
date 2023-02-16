interface RegisterProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  pw: string;
  pwCheck: string;
  setPW: React.Dispatch<React.SetStateAction<string>>;
  setPWCheck: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  emailerror: string;
  pwerror: string;
  pwcheckerror: string;
  registerBtn: any;
  closeModal: any;
}

const Register = ({
  userName,
  setUserName,
  setEmail,
  email,
  setPW,
  pw,
  setPWCheck,
  pwCheck,
  error,
  emailerror,
  pwerror,
  pwcheckerror,
  registerBtn,
  closeModal,
}: RegisterProps) => {
  const userHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const pwHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPW(event.target.value);
  };

  const pwCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPWCheck(event.target.value);
  };

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
        <h3 className="text-2xl font=semibold">회원가입</h3>
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
            닉네임
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            type="text"
            value={userName}
            onChange={userHandler}
            placeholder="닉네임"
          />
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
          <label className="block text-black font-2xl font-bold mb-3">
            비밀번호 확인
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            type="password"
            value={pwCheck}
            onChange={pwCheckHandler}
            placeholder="비밀번호를 다시 입력해주세요"
          />
          <div className="text-red-600 font-sm mb-6">{pwcheckerror}</div>
          <div className="flex items-center justify-center">
            <button
              className="m-1 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={registerBtn}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
