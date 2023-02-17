import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { CourseType } from "../../pages/Post";
import { authService, dbService } from "../../utils/firebase";
interface LikeProps {
  paramId: string | any;
  course: CourseType | undefined;
}

const LikeBtn = ({ paramId, course }: LikeProps) => {
  const [like, setLike] = useState(false);
  const courseLikes: any = course && course?.likeUsers.length;
  const [likeCount, setLikeCount] = useState<number | any>(0);
  const currentId = authService.currentUser?.uid;
  const courseRef = doc(dbService, "courses", paramId);
  const submitRef = useRef<HTMLButtonElement | any>();
  const submitLike = () => {
    if (!authService.currentUser) {
      setLike(false);
      alert("좋아요는 로그인 후 이용가능합니다.");
      return;
    }
    if (like === true) {
      setLike(false);
      setLikeCount(likeCount - 1);
      updateDoc(courseRef, {
        likes: likeCount,
        likeUsers: arrayRemove(currentId),
      });
    } else if (like === false) {
      setLike(true);
      setLikeCount(likeCount + 1);
      updateDoc(courseRef, {
        likes: likeCount,
        likeUsers: arrayUnion(currentId),
      });
    }
  };
  useEffect(() => {
    setLikeCount(courseLikes);
    const likeUser = course?.likeUsers.find((user) => user === currentId);
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
      <div className="flex items-center gap-3 text-white hover:text-gray-400 ">
        {like === true ? (
          <button
            ref={submitRef}
            className="text-rose-600 disabled:opacity-30"
            disabled
          >
            <IoHeartSharp size={40} onClick={() => submitLike()} />
          </button>
        ) : (
          <button
            ref={submitRef}
            className="text-rose-600 disabled:opacity-30 disabled:cursor-auto"
            disabled
          >
            <IoHeartOutline size={40} onClick={() => submitLike()} />
          </button>
        )}
        <p className="text-black">{likeCount}</p>
      </div>
    </div>
  );
};

export default LikeBtn;
