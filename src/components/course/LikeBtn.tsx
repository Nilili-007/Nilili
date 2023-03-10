import { useEffect, useRef, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { authService } from "../../utils/firebase";

import { useUpdateLikesMutation } from "../../redux/modules/apiSlice";
import { logEvent } from "../../utils/amplitude";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import Swal from "sweetalert2";

interface LikeProps {
  paramId: string | any;
  course: CourseType | undefined;
}

const LikeBtn = ({ paramId, course }: LikeProps) => {
  const [like, setLike] = useState(false);
  const courseLikes = course && course?.likesID.length;
  const [likeCount, setLikeCount] = useState<number | any>(0);
  const currentId = authService.currentUser?.uid;
  const submitRef = useRef<HTMLButtonElement | any>();
  const [updateLikesMutate] = useUpdateLikesMutation();

  const submitLike = async () => {
    if (!authService.currentUser) {
      setLike(false);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "좋아요는 로그인 후 이용 가능합니다",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (like === true) {
      setLike(false);
      setLikeCount(likeCount - 1);
    } else if (like === false) {
      setLike(true);
      setLikeCount(likeCount + 1);
    }
    logEvent("좋아요 클릭", { from: "상세페이지" });
  };

  useEffect(() => {
    const updateLikes = async () => {
      if (like && course) {
        await updateLikesMutate({
          courseId: paramId,
          likes: likeCount || null,
          likesID: arrayUnion(currentId),
        });
      } else {
        await updateLikesMutate({
          courseId: paramId,
          likes: likeCount || null,
          likesID: arrayRemove(currentId),
        });
      }
    };
    if (!currentId) return;
    updateLikes();
  }, [like, likeCount]);

  useEffect(() => {
    setLikeCount(courseLikes);
    const likeUser = course?.likesID.find((user) => user === currentId);
    if (likeUser) {
      setLike(true);
    } else {
      setLike(false);
    }
    if (authService.currentUser) {
      submitRef.current.disabled = false;
    }
    if (!authService.currentUser) {
      submitRef.current.disabled = true;
    }
  }, [courseLikes, authService.currentUser]);

  return (
    <div className="my-4 mr-2">
      <div className="flex items-center gap-3 text-white hover:text-gray-400 ">
        {like === true ? (
          <button
            ref={submitRef}
            className="text-[#EC6762] disabled:opacity-30"
            disabled
          >
            <IoHeartSharp
              size={33}
              onClick={() => submitLike()}
              className="sm:scale-125"
            />
          </button>
        ) : (
          <button
            ref={submitRef}
            className="text-[#EC6762]
            disabled:opacity-30 disabled:cursor-auto"
            disabled
          >
            <IoHeartOutline
              size={33}
              className="sm:scale-125"
              onClick={() => submitLike()}
            />
          </button>
        )}
        <p className="text-black text-[20px] font-medium">
          {!likeCount
            ? 0
            : likeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          개
        </p>
      </div>
    </div>
  );
};

export default LikeBtn;
