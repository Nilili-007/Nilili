import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface deleteType {
  target: string;
  deleteFn: any;
}
const useDelete = ({ target, deleteFn }: deleteType) => {
  const navigate = useNavigate();

  const deleteContentHandler = (id: string | undefined) => {
    Swal.fire({
      title: `${target} 삭제`,
      text: `정말 ${target}을 삭제하시겠어요?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 삭제할래요",
      cancelButtonText: "아니요, 취소할래요",
    }).then((result) => {
      if (result.isConfirmed) {
        if (target == "게시물") {
          navigate("/");
        }
        Swal.fire({
          icon: "success",
          title: `<p style="font-size: 20px;">${target}이 삭제되었습니다.</p>`,
          showConfirmButton: false,
          timer: 1500,
        });
        deleteFn(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">삭제가 취소되었습니다.</p>`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return { deleteContentHandler };
};

export default useDelete;
