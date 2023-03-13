import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { replaceAllData } from "../redux/modules/courseSlice";

const useCancelPost = () => {
  const paramId = useParams().id;
  let targetWord: string;
  let targetPage: string;

  if (window.location.pathname !== "/post") {
    targetWord = "수정";
    targetPage = `/course/${paramId}`;
  } else {
    targetWord = "작성";
    targetPage = "/";
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelPost = () => {
    Swal.fire({
      title: `<p style="font-size: 20px;">게시글 ${targetWord}을 취소하시겠습니까?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(targetPage);
        dispatch(replaceAllData([]));
      }
    });
  };

  return cancelPost;
};

export default useCancelPost;
