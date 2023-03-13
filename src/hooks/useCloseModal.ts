import { Dispatch, SetStateAction, useEffect } from "react";

const useCloseModal = (
  ref: React.RefObject<HTMLDivElement>,
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const clickOutsideModal = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", clickOutsideModal);
    };
  }, [ref, openModal]);
};

export default useCloseModal;
