import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

const Share = () => {
  // window 객체에서 현재 url 가져오기
  const currentURL = window.location.href;

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
        <button className="border border-red-500">kakaotalk</button>
      </div>
    </div>
  );
};

export default Share;
