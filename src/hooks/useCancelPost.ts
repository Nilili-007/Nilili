import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { replaceAllData } from "../redux/modules/courseSlice";

const useCancelPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelPost = () => {
    Swal.fire({
      title: "게시글 작성을 취소하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 다음 번에 쓸게요.",
      cancelButtonText: "아니요, 마저 쓸게요.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`);
        dispatch(replaceAllData([]));
      }
    });
  };

  return cancelPost;
};

export default useCancelPost;
