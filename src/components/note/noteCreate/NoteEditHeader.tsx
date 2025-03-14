import { UseFormHandleSubmit } from 'react-hook-form';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NoteSchemaType } from '@/lib/note-validation';
import Icon from '../../common/icon/Icon';
import Button from '../../common/button/Button';

type Props = {
  handleBack: () => void;
  isValid: boolean;
  isLoading: boolean;
  handleTempSave: () => void;
  isEditMode: boolean;
  onSubmit: ReturnType<UseFormHandleSubmit<NoteSchemaType>>;
};

export default function NoteEditHeader({
  handleBack,
  isValid,
  isLoading,
  handleTempSave,
  isEditMode,
  onSubmit,
}: Props) {
  return (
    <div className="w-full items-center border-b-2 border-gs200 bg-gs50 px-4 py-2 xs:flex sm:min-w-[400px]">
      <button type="button" onClick={handleBack}>
        <Icon icon={faArrowLeft} className="size-5" />
      </button>
      <div className="ml-2 flex w-full items-center justify-between">
        <h2 className="text-14SB xs:text-16SB md:text-18SB">노트 작성</h2>
        <div className="flex justify-end gap-2 xs:justify-normal">
          <Button
            disabled={!isValid || isLoading}
            size="medium"
            variant="outline"
            className="border-none bg-transparent !px-1 !py-3 transition-colors xs:!px-4 sm:!px-6 2xl:rounded-lg 2xl:!px-6 2xl:!text-14SB"
            onClick={handleTempSave}
          >
            임시저장
          </Button>
          <Button
            size="medium"
            className="!px-1 !py-3 transition-colors xs:!px-4 sm:!px-6 2xl:rounded-lg 2xl:!px-6 2xl:!text-14SB"
            type="submit"
            disabled={!isValid || isLoading}
            onClick={onSubmit}
          >
            {isEditMode ? '수정 완료' : '작성 완료'}
          </Button>
        </div>
      </div>
    </div>
  );
}
