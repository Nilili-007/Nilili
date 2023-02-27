import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "../../hooks/useScript";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  // window 객체에서 현재 url 가져오기
  const currentURL = window.location.href;

  const handleKakaoBtn = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "NILILI의 여행 코스를 공유합니다",
        description: "NILILI의 여행 코스로 여행을 다녀오세요!",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        link: {
          webUrl: currentURL,
          mobileWebUrl: currentURL,
        },
      },
      itemContent: {
        profileText: "NILILI",
        profileImageUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        titleImageUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            webUrl: currentURL,
            mobileWebUrl: currentURL,
          },
        },
      ],
    });
  };

  // kakao SDK import하기
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init(process.env.REACT_APP_KAKAO);
      }
    }
  }, [status]);

  return (
    <div>
      <h1>공유하기</h1>
      <div>
        <FacebookShareButton url={currentURL}>
          <FacebookIcon size={40} round={true} borderRadius={24} />
        </FacebookShareButton>
        <TwitterShareButton url={currentURL}>
          <TwitterIcon size={40} round={true} borderRadius={24} />
        </TwitterShareButton>
        <CopyToClipboard text={currentURL}>
          <button className="w-[40px] h-[40px] text-white borde-none rounded-full text-base bg-[#7362ff] hover:bg-[#a99fee]">
            URL
          </button>
        </CopyToClipboard>
        <button onClick={handleKakaoBtn}>
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="카카오링크 보내기 버튼"
          />
        </button>
      </div>
    </div>
  );
};

export default Share;
