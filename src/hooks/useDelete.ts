import React from "react";
import Swal from "sweetalert2";

interface deleteType {
  target: string;
  deleteFn: any;
}
const useDelete = ({ target, deleteFn }: deleteType) => {
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
        Swal.fire({
          icon: "success",
          title: `${target}이 삭제되었습니다.`,
          showConfirmButton: false,
          timer: 1500,
        });
        deleteFn(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "삭제가 취소되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return { deleteContentHandler };
};

export default useDelete;