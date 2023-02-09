import React from "react";

interface DeleteModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ setModalOpen }: DeleteModalProps) => {
  return (
    <div className="bg-white absolute inset-x-[10%] sm:inset-x-[20%] xl:inset-x-[30%] h-64 rounded-lg border-2 flex flex-col justify-center gap-y-10">
      <div className="flex items-center justify-center">
        <span className="text-lg">정말 삭제하시겠습니까?</span>
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl"
          onClick={() => setModalOpen(false)}
        >
          삭제
        </button>
        <button
          className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl"
          onClick={() => setModalOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
