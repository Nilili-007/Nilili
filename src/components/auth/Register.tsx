import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../../utils/firebase";

interface RegisterProps {
  closeModal: (e: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthForm {
  userName: string;
  email: string;
  password: string;
  confirm: string;
}

const Register = ({ setModal, closeModal }: RegisterProps) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({ mode: "onBlur" });

  const onSubmit = async (data: AuthForm) => {
    if (data.password !== data.confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (error !== "") setError("");

    setIsRegister(true);
    await createUserWithEmailAndPassword(authService, data.email, data.password)
      .then((data) => {
        alert("회원가입 성공");
        setModal(false);
        updateProfile(data.user, {
          displayName: userName,
          photoURL:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });
        return data.user;
      })
      .then((item) => {
        console.log(item);
        const userData = {
          photoURL:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          uid: item.uid,
          displayName: userName,
          email: item.email,
        };
        console.log(userData);
        localStorage.setItem("User", JSON.stringify(userData));
        setModal(false);
      })
      .catch((error) => {
        if (error.code.includes("auth/email-already-in-use")) {
          setError("이미 사용중인 이메일입니다.");
          return;
        }
        if (error.code.includes("auth/weak-password")) {
          setError("비밀번호는 6자 이상이어야 합니다");
          return;
        }
        setIsRegister(false);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-t ">
        <div> </div>
        <h3 className="text-2xl font-bold">회원가입</h3>
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
      <div className="relative p-6 flex-auto">
        <form
          className=" rounded px-8 pt-6 pb-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-yellow-500 font-bold m-2">{error}</div>
          <label className="block text-black font-2xl font-bold mb-3">
            닉네임
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            {...register("userName", {
              required: "닉네임을 입력해주세요",
              pattern: {
                value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/,
                message:
                  "닉네임은 2~8자로 영어 또는 숫자 또는 한글이 조합되어야 합니다.",
              },
            })}
            name="userName"
            type="text"
            id="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="닉네임"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit);
              }
            }}
            autoFocus
          />
          <div className="text-red-600 font-sm mb-6">
            {errors?.userName?.message}
          </div>
          <label className="block text-black font-2xl font-bold mb-3">
            이메일
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            {...register("email", {
              required: "이메일을 올바르게 입력해주세요",
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
                handleSubmit(onSubmit);
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
                handleSubmit(onSubmit);
              }
            }}
          />
          <div className="text-red-600 font-sm mb-6">
            {errors?.password?.message}
          </div>
          <label className="block text-black font-2xl font-bold mb-3">
            비밀번호 확인
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            {...register("confirm", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message:
                  "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~15자로 입력해주세요.",
              },
            })}
            autoComplete="new-password"
            name="confirm"
            type="password"
            id="confirm"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit);
              }
            }}
          />
          <div className="text-red-600 font-sm mb-6">
            {errors?.confirm?.message}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="m-1 text-white bg-purple-300 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
              //onClick={registerBtn}
              disabled={isRegister}
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
