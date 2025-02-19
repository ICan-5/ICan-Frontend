import cn from '@/utils/cn';
import TodayGraph from './TodayGraph';

type Props = {
  progress: number;
};

export default function TodayProgress({ progress }: Props) {
  const progressMessage =
    progress > 0 ? '잘 하고 있어요!' : '차근차근 시작해볼까요?';
  return (
    <div className="relative flex h-full min-h-48 w-full flex-1 flex-col rounded-2xl border-2 border-gs200 px-6 py-4 2xl:rounded-3xl">
      <p className="text-16SB 2xl:text-18SB">금일 진행도</p>
      <TodayGraph progress={progress} />
      <p
        className={cn(
          'text-40L absolute left-0 top-1/2 flex w-full flex-col items-center gap-7 md:text-50L',
          progress > 0 ? 'text-slate500' : 'text-gs400',
        )}
      >
        {Math.floor(progress * 100)}%
        <span className="text-12R text-gs600">{progressMessage}</span>
      </p>
    </div>
  );
}
