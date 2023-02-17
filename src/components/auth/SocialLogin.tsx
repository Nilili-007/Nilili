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
    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
      <div className="flex-column items-center">
        <div>
          <button onClick={signInGoogle}>
            <img className="w-80" src="./login/google.png" alt="" />
          </button>
        </div>
        <div>
          <button onClick={signInFacebook}>
            <img className="w-80" src="./login/facebook.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
