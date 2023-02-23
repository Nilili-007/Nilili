import { useEffect, useRef, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { authService } from "../../utils/firebase";

import { useUpdateLikesMutation } from "../../redux/modules/apiSlice";
interface LikeProps {
  paramId: string | any;
  course: CourseType | undefined;
}

const LikeBtn = ({ paramId, course }: LikeProps) => {
  const [like, setLike] = useState(false);
  const courseLikes = course && course?.likes;
  const [likeCount, setLikeCount] = useState<number | any>(0);
  const currentId = authService.currentUser?.uid;
  const submitRef = useRef<HTMLButtonElement | any>();
  const [updateLikesMutate] = useUpdateLikesMutation();

  const submitLike = async () => {
    if (!authService.currentUser) {
      setLike(false);
      alert("좋아요는 로그인 후 이용가능합니다.");
      return;
    }
    if (like === true) {
      setLike(false);
      setLikeCount(likeCount - 1);
    } else if (like === false) {
      setLike(true);
      setLikeCount(likeCount + 1);
    }
  };

  useEffect(() => {
    const updateLikes = async () => {
      if (like && course) {
        await updateLikesMutate({
          courseId: paramId,
          likes: likeCount || null,
          likesID: [...course.likesID, currentId],
        });
      } else {
        await updateLikesMutate({
          courseId: paramId,
          likes: likeCount || null,
          likesID: course?.likesID.filter((item) => item !== currentId),
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
    <div className="my-4">
      <div className="flex justify-end items-center gap-3 text-white hover:text-gray-400 ">
        <p className="text-black text-[20px] font-medium">
          {!likeCount ? 0 : likeCount}
        </p>
        {like === true ? (
          <button
            ref={submitRef}
            className="text-[#EC6762] disabled:opacity-30"
            disabled
          >
            <IoHeartSharp size={40} onClick={() => submitLike()} />
          </button>
        ) : (
          <button
            ref={submitRef}
            className="text-[#EC6762] disabled:opacity-30 disabled:cursor-auto"
            disabled
          >
            <IoHeartOutline size={40} onClick={() => submitLike()} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LikeBtn;
