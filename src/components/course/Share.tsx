import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const Share = () => {
  // window 객체에서 현재 url 가져오기
  const currentURL = window.location.href;

  return (
    <div>
      <h1>공유하기</h1>
      <div>
        <FacebookShareButton url={currentURL}>
          <FacebookIcon size={30} round={true} borderRadius={24} />
        </FacebookShareButton>
        <TwitterShareButton url={currentURL}>
          <TwitterIcon size={30} round={true} borderRadius={24} />
        </TwitterShareButton>
        <button className="border border-red-500">url</button>
        <button className="border border-red-500">kakaotalk</button>
      </div>
    </div>
  );
};

export default Share;
