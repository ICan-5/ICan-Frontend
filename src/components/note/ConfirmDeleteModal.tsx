interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onDelete,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gsBk bg-opacity-30">
      <div className="w-80 rounded-lg bg-gs00 p-6 shadow-lg">
        <p className="text-center text-16R text-gs800">
          노트를 정말 삭제하시겠어요? <br /> 삭제된 노트는 복구할 수 없어요.
        </p>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-lg bg-gs300 py-2 text-gs700 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="ml-2 w-1/2 rounded-lg bg-warn500 py-2 text-gs00"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
