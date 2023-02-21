import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../../utils/firebase";

interface SocialProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialLogin = ({ setModal }: SocialProps) => {
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

  return (
    <div className="flex-column items-center justify-column p-6">
      <div className="flex items-center justify-center text-black text-sm font-semibold mb-2">
        SNS 계정으로 로그인하기
      </div>
      <div className="flex items-center justify-center">
        <div className="m-3 border-none">
          <button onClick={signInGoogle}>
            <img src="./login/google.png" alt="" />
          </button>
        </div>
        <div className="m-3 border-none">
          <button onClick={signInFacebook}>
            <img src="./login/facebook.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
