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
import Swal from "sweetalert2";
import { logEvent } from "../../utils/amplitude";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  // window 객체에서 현재 url 가져오기
  const currentURL = window.location.href;

  // mobile web share api
  const shareHandle = () => {
    if (navigator.share) {
      navigator.share({
        title: "NILILI",
        text: "NILILI의 여행코스를 공유해보세요",
        url: currentURL,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "공유하기가 지원되지 않는 환경입니다",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const shareAmplitudeEvent = () => {
    logEvent("게시물 공유", { from: "상세페이지" });
  };

  const handleKakaoBtn = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "NILILI의 여행 코스를 공유합니다",
        description: "NILILI의 여행 코스로 여행을 다녀오세요!",
        imageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmlJIr%2Fbtr2D3uWD6G%2FaRo3CI0zyhvAuXWkutSgh0%2Fimg.png",
        link: {
          webUrl: currentURL,
          mobileWebUrl: currentURL,
        },
      },
      itemContent: {
        profileText: "NILILI",
        profileImageUrl:
          "https://user-images.githubusercontent.com/95006849/223911750-1a670f54-a6f2-4d06-a2eb-2920865fd05d.png",
        titleImageUrl:
          "https://user-images.githubusercontent.com/95006849/223911750-1a670f54-a6f2-4d06-a2eb-2920865fd05d.png",
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
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("48bbfc6b192bda8667b971cc07bdee12");
      }
    }
  }, [status]);

  return (
    <>
      <div className="md:flex justify-end items-center gap-3 mt-2 hidden">
        <div className="flex gap-1">
          <FacebookShareButton
            url={currentURL}
            onClick={() => shareAmplitudeEvent()}
          >
            <FacebookIcon size={40} round={true} borderRadius={24} />
          </FacebookShareButton>
          <TwitterShareButton
            url={currentURL}
            onClick={() => shareAmplitudeEvent()}
          >
            <TwitterIcon size={40} round={true} borderRadius={24} />
          </TwitterShareButton>
          <CopyToClipboard
            text={currentURL}
            onCopy={() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "클립보드에 복사되었습니다",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            <button onClick={() => shareAmplitudeEvent()}>
              <img
                className="w-[40px] h-[40px] border rounded-full bg-white"
                src="https://cdn.icon-icons.com/icons2/3510/PNG/512/link_share_url_hyperlink_icon_220890.png"
                alt="링크복사"
              />
            </button>
          </CopyToClipboard>
          <button
            onClick={() => {
              handleKakaoBtn();
              shareAmplitudeEvent();
            }}
          >
            <img
              className="w-[40px] h-[40px]"
              src="https://miro.medium.com/v2/resize:fit:288/format:webp/1*IsSbRIzHF8qqFQGTl3bNMg.png"
              alt="카카오링크 보내기 버튼"
            />
          </button>
        </div>
      </div>
      <div className="md:hidden flex flex-col mt-4">
        <button
          onClick={() => {
            shareHandle();
            shareAmplitudeEvent();
          }}
        >
          <img
            className="w-[40px] h-[40px] object-fill"
            src="https://cdn-icons-png.flaticon.com/512/157/157960.png"
            alt="공유"
          />
        </button>
      </div>
    </>
  );
};

export default Share;
