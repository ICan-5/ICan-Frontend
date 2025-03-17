'use client';

import cn from '@/utils/cn';
import TodayGraph from './TodayGraph';
import { useProgress } from '@/hooks/useDashboard';

interface Props {
  progressData: number;
}

export default function TodayProgress({ progressData }: Props) {
  const date = new Date().toLocaleDateString('sv-SE');
  const { data } = useProgress(date, progressData);
  const progress = data || progressData;
  /**
   * @returns 진행도에 따른 문구
   * progress에 맞는 문구를 리턴해주는 함수
   */
  const getProgressMessage = () => {
    if (progress <= 0.1) return '차근차근 시작해볼까요?';
    if (progress <= 0.3) return '좋아요! 조금씩 진행해 봐요';
    if (progress <= 0.7) return '잘하고 있어요! 계속 가볼까요?';
    if (progress < 1) return '거의 다 왔어요! 마지막까지 힘내요!';
    return '대단해요! 오늘도 목표 달성!';
  };

  return (
    <div className="relative flex size-full min-h-56 flex-[3] flex-col rounded-2xl border-2 border-gs200 px-6 py-4 2xl:rounded-3xl">
      <p className="text-16SB text-gsBk 2xl:text-18SB">금일 진행도</p>
      <TodayGraph progress={progress} />
      <p
        className={cn(
          'absolute left-0 top-1/2 flex w-full flex-col items-center gap-4 !text-40L md:gap-7 md:!text-50L',
          progress > 0 ? 'text-slate500' : 'text-gs400',
        )}
      >
        {Math.floor(progress * 100)}%
        <span className="text-12R text-gs600">{getProgressMessage()}</span>
      </p>
    </div>
  );
}
