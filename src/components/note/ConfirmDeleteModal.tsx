import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import Button from '../common/button/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onDelete,
}: Props) {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="flex w-[450px] flex-col gap-6 rounded-lg bg-gs00 p-6">
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <div className="px-4 py-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-400">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-3xl text-gs00"
              />
            </div>
          </div>
          <span className="text-18M">노트를 정말 삭제하시겠어요?</span>
          <span className="text-14M text-gs400">
            삭제된 노트는 복구할 수 없어요.
          </span>
        </div>
        <div className="flex w-full flex-row gap-2">
          <Button
            size="full"
            onClick={onClose}
            className="bg-gs100 py-4 text-gs600 hover:bg-gs100 focus:bg-gs100 active:bg-gs100"
          >
            취소
          </Button>
          <Button
            size="full"
            onClick={onDelete}
            className="bg-warn500 py-4 text-gs00 hover:bg-warn500 focus:bg-warn500 active:bg-warn500"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
