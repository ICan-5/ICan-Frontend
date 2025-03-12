import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../common/icon/Icon';
import Button from '../../common/button/Button';

type Props = {
  savedData: string | null;
  showSavedData: boolean;
  setShowSavedData: (show: boolean) => void;
  setTempData: () => void;
};

export default function TempSaveNotification({
  savedData,
  showSavedData,
  setShowSavedData,
  setTempData,
}: Props) {
  if (!showSavedData || !savedData) return null;

  return (
    <section className="flex h-fit w-full flex-wrap items-center rounded-b-[28px] bg-slate100 px-4 py-2">
      <div className="mb-1 flex flex-1 flex-nowrap items-center sm:mb-0">
        <Icon icon={faExclamation} className="text-slate500" />
        <p className="text-14M text-slate500">
          임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
        </p>
      </div>
      <div className="ml-auto flex min-w-40 items-center justify-end">
        <Button
          className="bg-transparent !py-2 px-5 !text-14R text-gs600 transition-colors hover:bg-transparent focus:bg-transparent active:bg-transparent 2xl:!text-14R"
          onClick={() => setShowSavedData(false)}
        >
          닫기
        </Button>
        <Button
          variant="outline"
          className="h-9 rounded-full px-4 py-2 text-14M transition-colors 2xl:rounded-full 2xl:py-2 2xl:!text-14M"
          onClick={() => {
            setTempData();
            setShowSavedData(false);
          }}
        >
          불러오기
        </Button>
      </div>
    </section>
  );
}
