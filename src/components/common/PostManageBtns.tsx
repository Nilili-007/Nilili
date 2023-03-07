import { useCancelPost } from "../../hooks";

const PostManageBtns = ({ postHandler }: any) => {
  let target: string;
  if (window.location.pathname === "/post") {
    target = "등록";
  } else {
    target = "수정";
  }

  const cancelPost = useCancelPost();

  return (
    <div className="flex flex-col sm:flex-row w-full justify-center gap-2 my-10 sm:gap-[5%]">
      <button
        onClick={(e) => postHandler(e)}
        className="w-full sm:w-[472px] bg-black border-black border-2 text-white text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white "
      >
        게시물 {target}하기
      </button>
      <button
        onClick={cancelPost}
        className="w-full sm:w-[472px] bg-white border-gray-04 border text-black text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white"
      >
        취소하기
      </button>
    </div>
  );
};

export default PostManageBtns;
