interface Toggle {
  setToggle: any;
  setLoginBtn: any;
}

const Register = ({ setToggle, setLoginBtn }: Toggle) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-2xl font=semibold">회원가입</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setLoginBtn(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form className=" rounded px-8 pt-6 pb-8 w-full">
              <label className="block text-black text-sm font-bold mb-3">
                E-mail
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
              <label className="block text-black text-sm font-bold mb-3">
                비밀번호
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
              <label className="block text-black text-sm font-bold mb-3">
                비밀번호 확인
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-6" />
              <div className="flex items-center justify-center">
                <button
                  className="m-2 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setToggle(false)}
                >
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
