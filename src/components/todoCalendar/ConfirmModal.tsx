import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmModal({ onClose, onConfirm }: Props) {
  return (
    <div className="flex w-[450px] flex-col gap-6 rounded-lg bg-gs00 p-6">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <div className="px-4 py-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400">
            <FontAwesomeIcon
              icon={faExclamation}
              className="text-3xl text-gs00"
            />
          </div>
        </div>
        <span className="text-18M">정말 나가시겠어요?</span>
        <span className="text-14M text-gs400">
          작성한 내용이 모두 사라집니다.
        </span>
      </div>
      <div className="flex w-full flex-row gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full justify-center rounded-xl bg-gs100 py-3 text-16SB text-gs600"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex w-full justify-center rounded-xl bg-warn500 py-3 text-16SB text-gs00"
        >
          나가기
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
